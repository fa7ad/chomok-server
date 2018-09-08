const path = require('path')

const PouchDB = require('pouchdb')
const express = require('express')

const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const PouchSession = require('session-pouchdb-store')
const passport = require('passport')

PouchDB.plugin(require('pouchdb-find'))
const setEnv = require('./init')
const setAuth = require('./controllers/auth')

const app = express()
const env = setEnv()

const createDB = name =>
  new PouchDB(path.resolve(env.cwd, 'db', env.db_prefix.concat(name)))

const DB = {
  users: createDB('users'),
  offers: createDB('offers')
}

setAuth(app, DB.users)

app.use(logger('dev'))
app.use(
  session({
    secret: 'monkey 13',
    rolling: true,
    cookie: {
      secure: env.prod
    },
    store: new PouchSession(createDB('sessions'))
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb', extended: true }))

DB.users
  .createIndex({
    index: {
      fields: ['username'],
      ddoc: 'users-username-idx'
    }
  })
  .then(_ =>
    app.listen(env.port, function () {
      console.log(`Listening on http://localhost:${env.port}`)
    })
  )
