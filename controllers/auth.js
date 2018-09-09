import { Router } from 'express'

import { DateTime } from 'luxon'
import Joi from 'joi'

import { compare, hash } from 'bcrypt'
import passport from 'passport'

import { dbs, createUserIndex } from '../lib/init'
const db = dbs.users

// Define routes under /auth
const route = Router()

route.post('/register', regUser, function (req, res) {
  db.post({ ...req.body })
    .then(_ => createUserIndex(db))
    .then(_ => res.json({ ok: true }))
    .catch(_ =>
      res.status(500).json({
        ok: false,
        error: { message: 'Internal server error' }
      })
    )
})

route.post('/login', passport.authenticate('local', {}), function (req, res) {
  res.json({ ok: true, id: req.user._id })
})

route.get('/loggedIn', (req, res) => res.json({ ok: !!req.user }))

route.get('/logout', function (req, res) {
  req.logout()
  res.json({ ok: true })
})

export default route

//= Helper functions

export async function regUser (req, res, next) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[a-zA-z\s]+$/)
        .min(3)
        .required(),
      phone: Joi.string()
        .regex(/^(\+88|0088)?01[5-9]\d{8}$/)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      username: Joi.string()
        .lowercase()
        .regex(/^[a-z][^\s]{4,}$/)
        .required(),
      password: Joi.string()
        .required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .required(),
      dateReg: Joi.string()
        .regex(/^(\d{6}|\d{8})$/)
        .default(
          () => DateTime.local().toFormat('yyyyLLdd'),
          'Current date is default'
        ),
      admin: Joi.boolean().default(false),
      business: Joi.object()
        .keys({
          address: Joi.string(),
          name: Joi.string(),
          phone: Joi.string().regex(/^(\+88|0088)?0(1[5-9]|2)\d{8}$/)
        })
        .requiredKeys(['address', 'name', 'phone'])
    })

    const data = await schema.validate(req.body)
    const { docs: users } = await db.find({
      selector: { username: data.username }
    })
    if (users.length > 0) {
      return res.status(409).json({
        ok: false,
        error: {
          message: 'Username already exists'
        }
      })
    }

    req.body = Object.assign({}, data, {
      password: await hash(data.password, 10)
    })
    if (data.admin || data.business) {
      return verifyAdmin(req, res, next)
    }
    next()
  } catch (err) {
    let error = err
    if (error.isJoi) error = { message: err.details.map(e => e.message) }
    res.status(400).json({ ok: false, error })
  }
}

export function verifyAdmin (req, res, next) {
  if (req.user && req.user.admin) return next()
  return res
    .status(!req.user ? 401 : 403)
    .json({ ok: true, error: { message: 'Only admin can access this data' } })
}

export async function localStrategyCallback (username, password, done) {
  try {
    const {
      docs: [user]
    } = await db.find({
      selector: { username },
      use_index: 'users-username-idx'
    })
    if (!user) {
      done(null, false, { message: 'Incorrect username' })
      return
    }

    const passEql = await compare(password, user.password)
    if (!passEql) {
      done(null, false, { message: 'Incorrect password' })
      return
    }

    done(null, {
      ...user,
      type: user.admin ? 'admin' : user.business ? 'partner' : 'user'
    })
  } catch (err) {
    done(err)
  }
}
