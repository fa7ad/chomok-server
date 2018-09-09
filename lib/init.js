import { resolve } from 'path'
import { hash } from 'bcrypt'
import { DateTime } from 'luxon'

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

export const dbs = {
  users: createDB('users'),
  offers: createDB('offers')
}

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

export const listen = (app, port) =>
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
