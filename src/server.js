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
import imagesController from './controllers/images'

import { env, listen, usersdb, prepUser, errorify } from './lib/utils'
import {
  localStrategyCallback,
  verifyAdmin,
  verifyLogin
} from './lib/middleware'

const app = express()

const MemorySession = memsess(session)
const sess = {
  secret: env.secret,
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new MemorySession({
    checkPeriod: 1.296e8 // 1.5 days
  }),
  cookie: {
    maxAge: 8.64e7 // 1 day
  }
}

app.use(logger(env.prod ? 'tiny' : 'dev'))
app.use(compress())
app.use(helmet())
app.use(cors())

if (env.prod) {
  Object.assign(sess, {
    proxy: true,
    cookie: { secure: true, domain: '.chomoks.com', maxAge: 8.64e7 }
  })
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
}

app.use(session(sess))
app.use(urlencoded({ extended: true }))
app.use(json({ extended: true }))

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
app.use('/images', imagesController)
const clients = 'about|admin|contact|login|partner|offer|register'
app.use(clients.split('|').map(x => '/' + x + '*'), (req, res) => {
  res.sendFile(path.join(env.client, 'index.html'))
})
app.use(function (err, req, res, next) {
  if (err) errorify(err, res)
})

prepUser(usersdb)
  .then(listen(app, env.port))
  .then(_ => {
    console.log('NODE_ENV:', process.env.NODE_ENV || env.prod)
    console.log(`Listening on http://localhost:${env.port}`)
  })
  .catch(console.error)
