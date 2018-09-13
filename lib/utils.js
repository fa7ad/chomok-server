import { resolve } from 'path'
import { hash } from 'bcrypt'
import { DateTime } from 'luxon'
import { map, prop, compose, find, curry, whereEq, filter } from 'ramda'

import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

PouchDB.plugin(PouchFind)

export const env = {
  port: process.env.PORT || 3333,
  db_prefix: process.env.DB_PREFIX || 'ch_',
  cwd: resolve(process.env.CWD || __dirname),
  prod: process.env.NODE_ENV === 'production'
}

export const createDB = name =>
  new PouchDB(resolve(env.cwd, 'db', env.db_prefix.concat(name)))

export const usersdb = createDB('users')
export const zonesdb = createDB('zones')
export const offersdb = createDB('offers')
export const codesdb = createDB('codes')

async function seedAdmin (db) {
  return db.post({
    _id: '0a0b1a1b',
    name: 'Gott',
    phone: '01912345678',
    username: 'prgmlord',
    password: await hash('Prgml0rd', 10),
    dateReg: DateTime.local().toFormat('yyyyLLdd'),
    admin: true
  })
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
    app.listen(port, resolve)
  })

export async function prepUser (db) {
  try {
    const user = await db.get('0a0b1a1b')
    if (user) console.log('Admin: prgmlord:Prgml0rd')
  } catch (e) {
    const admin = await seedAdmin(db)
    if (admin) console.log('Admin: prgmlord:Prgml0rd')
  }
  try {
    await createUserIndex(db)
  } catch (e) {
    console.log('Failed to index the database')
  }
}

export function errorify (err) {
  const error = {
    message: err.isJoi
      ? map(prop('message'), err.details)
      : err.message || 'Internal server error'
  }
  return { status: err.status || (err.isJoi ? 400 : 500), error }
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

export const getLocalDate = () => DateTime.local().toFormat('yyyyLLdd')

export const findLike = curry((pred, data) => find(whereEq(pred), data))

export const findAllLike = curry((pred, data) => filter(whereEq(pred), data))

export const toBase64 = data => Buffer.from(data).toString('base64')
