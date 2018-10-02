import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import express from 'express'
import memsess from 'memorystore'
import session from 'express-session'
import { urlencoded, json } from 'body-parser'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import authController from './controllers/auth'
import usersController from './controllers/users'
import zonesController from './controllers/zones'
import offersController from './controllers/offers'
import codesController from './controllers/codes'

import { env, listen, usersdb, prepUser } from './lib/utils'
import {
  localStrategyCallback,
  verifyAdmin,
  verifyLogin
} from './lib/middleware'

const app = express()

const MemorySession = memsess(session)

app.use(logger('dev'))
app.use(helmet())
app.use(cors())
app.set('trust proxy', true)
app.use(
  session({
    secret: 'monkey 13',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new MemorySession({
      checkPeriod: 86400000
    }),
    proxy: env.prod,
    cookie: {
      maxAge: 6e4
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

app.use(express.static(path.resolve(env.cwd, 'dist')))

app.use('/api', authController)
app.use('/api/users', verifyAdmin, usersController)
app.use('/api/zones', zonesController)
app.use('/api/offers', offersController)
app.use('/api/codes', verifyLogin, codesController)
app.use('*', (req, res) => {
  res.sendFile(path.join(env.cwd, 'dist', 'index.html'))
})

prepUser(usersdb)
  .then(listen(app, env.port))
  .then(_ => console.log(`Listening on http://localhost:${env.port}`))
  .catch(console.error)
