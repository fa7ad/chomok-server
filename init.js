import { resolve } from 'path'
import { curry } from 'ramda'
import { hash } from 'bcrypt'
import { DateTime } from 'luxon'

export async function seedAdmin (db) {
  return db.post({
    _id: '0a0b1a1b',
    name: 'Gott',
    phone: '01912345678',
    username: 'admin',
    password: await hash('s3cure3', 10),
    dateReg: DateTime.local().toFormat('yyyyLLdd'),
    admin: true
  })
}

export function getEnv () {
  return {
    port: process.env.PORT || 3333,
    db_prefix: process.env.DB_PREFIX || 'ch_',
    cwd: resolve(process.env.CWD || __dirname),
    prod: process.env.NODE_ENV === 'production'
  }
}

export async function createUserIndex (db) {
  return db.createIndex({
    index: {
      fields: ['username'],
      ddoc: 'users-username-idx'
    }
  })
}

export const listen = curry(
  (app, port) =>
    new Promise((resolve, reject) => {
      app.listen(port, resolve)
    })
)
