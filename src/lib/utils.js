import { resolve } from 'path'
import { hash } from 'bcrypt'
import { DateTime } from 'luxon'
import { map, prop, compose, find, curry, whereEq, filter } from 'ramda'

import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import userSchema from '../models/user'

PouchDB.plugin(PouchFind)

const cwd = resolve(process.cwd() || __dirname)
export const env = {
  port: process.env.PORT || 3333,
  db_prefix: process.env.DB_PREFIX || 'ch_',
  cwd,
  client: resolve(cwd, 'client', 'build'),
  prod: process.env.NODE_ENV === 'production'
}

export const createDB = name =>
  new PouchDB(resolve(env.cwd, 'db', env.db_prefix + name))

export const usersdb = createDB('users')
export const zonesdb = createDB('zones')
export const offersdb = createDB('offers')
export const codesdb = createDB('codes')

async function seedAdmin (db) {
  const data = await userSchema.validate({
    name: 'Gott',
    phone: '01912345678',
    username: 'prgmlord',
    password: 'Prgml0rd',
    dateReg: DateTime.local().toFormat('yyyyLLdd'),
    email: 'superman@admin.com',
    admin: true
  })
  data.password = await hash(data.password, 10)
  return db.put({ _id: '0a0b1a1b', ...data })
}

export async function createUserIndex (db) {
  return db.createIndex({
    index: {
      fields: ['username'],
      ddoc: 'users-username-idx'
    }
  })
}

export const listen = (app, port) => () =>
  new Promise((resolve, reject) => {
    app.listen(port, err => {
      if (err) reject(err)
      else resolve(true)
    })
  })

export async function prepUser (db) {
  try {
    const user = await db.get('0a0b1a1b')
    if (user) console.log(`Admin(${user._id}): prgmlord:Prgml0rd`)
  } catch (e) {
    const admin = await seedAdmin(db)
    if (admin) console.log(`Admin(${admin._id}): prgmlord:Prgml0rd`)
  }
  try {
    await createUserIndex(db)
  } catch (e) {
    console.log('Failed to index the database')
  }
}

export const errorify = (err, res = false) => {
  const error = {
    message: err.isJoi
      ? map(prop('message'), err.details)
      : err.message || 'Internal server error'
  }
  const result = {
    status: err.status || (err.isJoi ? 400 : err.notFound ? 404 : 500),
    error
  }
  if (res) res.status(result.status).json({ ok: false, error })
  return result
}

export const onlyDocs = compose(
  map(prop('doc')),
  prop('rows')
)

export class HTTPError extends Error {
  constructor (status, message) {
    super(message)
    this.status = status
  }
}

export const getLocalDate = () =>
  DateTime.local()
    .setZone('UTC+6')
    .toFormat('yyyyLLdd')

export const findLike = curry((pred, data) => find(whereEq(pred), data))

export const findAllLike = curry((pred, data) => filter(whereEq(pred), data))

export const toBase64 = data => Buffer.from(data).toString('base64')
