import { compare, hash } from 'bcrypt'
import { merge, path } from 'ramda'

import userSchema from '../models/user'
import { usersdb, HTTPError } from './utils'

export async function regUser (req, res, next) {
  try {
    const data = await userSchema.validate(req.body)
    const { docs: userlist } = await usersdb.find({
      selector: { username: data.username }
    })
    if (userlist.length > 0) {
      throw HTTPError(409, 'Username already exists')
    }

    req.body = merge(data, {
      password: await hash(data.password, 10)
    })
    if (data.type !== 'user') {
      verifyAdmin(req, res, next)
    } else next()
  } catch (err) {
    next(err)
  }
}

export function verifyAdmin (req, res, next) {
  if (req.user && req.user.admin) next()
  else {
    const err = new HTTPError(req.user ? 403 : 401, 'Unauthorized!')
    next(err)
  }
}

export async function localStrategyCallback (username, password, done) {
  try {
    const user = path(
      ['docs', 0],
      await usersdb.find({
        selector: { username },
        use_index: 'users-username-idx'
      })
    )

    if (!user) {
      done(null, false, { message: 'Incorrect username' })
    } else if (!(await compare(password, user.password))) {
      done(null, false, { message: 'Incorrect password' })
    } else {
      done(null, user)
    }
  } catch (err) {
    done(err)
  }
}

export function verifyLogin (req, res, next) {
  if (req.user) return next()
  throw HTTPError(401, 'Unauthorized')
}

export function verifyAuthorized (req, res, next) {
  if (req.user && req.user.type && req.user.type !== 'user') return next()
  throw HTTPError(req.user ? 403 : 401, 'Unauthorized')
}
