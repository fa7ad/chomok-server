import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import express from 'express'
import compress from 'compression'
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
const sess = {
  secret: 'monkey 13',
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new MemorySession({
    checkPeriod: 7.2e6 // 2 hrs
  }),
  cookie: {
    maxAge: 6e5 // 10 mins
  }
}

app.use(logger(env.prod ? 'tiny' : 'dev'))
app.use(compress())
app.use(helmet())
app.use(cors())

if (env.prod) {
  Object.assign(sess, {
    proxy: true,
    cookie: { secure: true, domain: '.chomok.xyz' }
  })
  app.set('trust proxy', true)
}

app.use(session(sess))
app.use(urlencoded({ limit: '5mb', extended: true }))
app.use(json({ limit: '5mb', extended: true }))

app.use(passport.initialize())
app.use(passport.session())

passport.use('local', new LocalStrategy(localStrategyCallback))

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(usersdb.get)

app.use(express.static(env.client))

app.use('/api', authController)
app.use('/api/users', verifyAdmin, usersController)
app.use('/api/zones', zonesController)
app.use('/api/offers', offersController)
app.use('/api/codes', verifyLogin, codesController)
app.use('*', (req, res) => {
  res.sendFile(path.join(env.client, 'index.html'))
})

prepUser(usersdb)
  .then(listen(app, env.port))
  .then(_ => {
    console.log('NODE_ENV:', process.env.NODE_ENV || env.prod)
    console.log(`Listening on http://localhost:${env.port}`)
  })
  .catch(console.error)
