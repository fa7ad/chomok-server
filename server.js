import { resolve } from 'path'

import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

import logger from 'morgan'
import express from 'express'
import session from 'express-session'
import PouchSession from 'session-pouchdb-store'
import { urlencoded, json } from 'body-parser'

import passport from 'passport'

import { getEnv, createUserIndex, listen, seedAdmin } from './init'
import authenticate from './controllers/auth'

const app = express()
const env = getEnv()
PouchDB.plugin(PouchFind)

const createDB = name =>
  new PouchDB(resolve(env.cwd, 'db', env.db_prefix.concat(name)))

const Data = {
  users: createDB('users'),
  offers: createDB('offers')
}

app.use(logger('dev'))
app.use(
  session({
    secret: 'monkey 13',
    rolling: true,
    resave: true,
    saveUninitialized: false,
    store: new PouchSession()
  })
)
app.use(urlencoded({ limit: '5mb', extended: true }))
app.use(json({ limit: '5mb', extended: true }))

app.use(passport.initialize())
app.use(passport.session())
authenticate(app, Data.users, passport)

Data.users
  .get('0a0b1a1b')
  .then(
    _ => console.log(`Admin: admin:s3cure3`),
    _ => seedAdmin(Data.users).then(_ => console.log(`Admin: admin:s3cure3`))
  )

createUserIndex(Data.users)
  .then(_ => listen(app, env.port))
  .then(_ => console.log(`Listening on http://localhost:${env.port}`))
  .catch(console.error)
