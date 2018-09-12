import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import express from 'express'
import session from 'express-session'
import PouchSession from 'session-pouchdb-store'
import { urlencoded, json } from 'body-parser'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import authController from './controllers/auth'
import usersController from './controllers/users'
import zonesController from './controllers/zones'
import offersController from './controllers/offers'

import { env, listen, usersdb, prepUser } from './lib/utils'
import {
  localStrategyCallback,
  verifyAdmin,
  verifyLogin
} from './lib/middleware'

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(cors())
app.use(
  session({
    secret: 'monkey 13',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    store: new PouchSession(),
    cookie: {
      maxAge: 6e4,
      secure: env.prod
    }
  })
)
app.use(urlencoded({ limit: '5mb', extended: true }))
app.use(json({ limit: '5mb', extended: true }))

app.use(passport.initialize())
app.use(passport.session())

passport.use('local', new LocalStrategy(localStrategyCallback))

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(usersdb.get)

app.use('/auth', authController)
app.use('/users', verifyAdmin, usersController)
app.use('/zones', zonesController)
app.use('/offers', verifyLogin, offersController)

prepUser(usersdb)
  .then(listen(app, env.port))
  .then(_ => console.log(`Listening on http://localhost:${env.port}`))
  .catch(console.error)
