import { Router } from 'express'

import { DateTime } from 'luxon'
import { object, string, boolean } from 'joi'

import { compare } from 'bcrypt'
import { ensureLoggedIn } from 'connect-ensure-login'
import passport from 'passport'

import { dbs } from '../lib/init'
const db = dbs.users

// Define routes under /auth
const route = Router()

route.post('/register', regUser, verifyAdmin, function (req, res) {
  db.post({ ...req.body })
    .then(_ => {
      if (!req.user) req.login()
      res.json({ ok: true })
    })
    .catch(_ => {
      res.status(500).json({
        ok: false,
        error: { message: 'Internal server error' }
      })
    })
})

route.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: true
  }),
  function (req, res) {
    res.json({ ok: true, id: req.user._id })
  }
)

route.get('/loggedIn', (req, res) => res.json({ ok: !!req.user }))

route.get('/logout', function (req, res) {
  req.logout()
  res.json({ ok: true })
})

export default route

//= Helper functions

async function regUser (req, res, next) {
  try {
    const schema = object().keys({
      name: string()
        .alphanum()
        .min(3)
        .required(),
      phone: string()
        .regex(/^(\+88|0088)?01[5-9]\d{8}$/)
        .required(),
      email: string()
        .email()
        .required(),
      username: string()
        .lowercase()
        .regex(/^[a-z][^\s]{4,}$/)
        .required(),
      password: string()
        .required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .required(),
      dateReg: string()
        .regex(/^(\d{6}|\d{8})$/)
        .default(() => DateTime.local().toFormat('yyyyLLdd')),
      admin: boolean().default(false),
      business: object()
        .keys({
          address: string(),
          name: string(),
          phone: string().regex(/^(\+88|0088)?0(1[5-9]|2)\d{8}$/)
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

    if (data.admin || data.business) {
      req.body = { ...data }
      req.requireAdmin = true
      return ensureLoggedIn({ failureRedirect: '/' })(req, res, next)
    }
    next()
  } catch (err) {
    let error = err
    if (error.isJoi) error = { message: error.details.map(e => e.message) }
    res.status(400).json({ ok: false, error })
  }
}

function verifyAdmin (req, res, next) {
  if (req.requireAdmin && req.user && !req.user.admin) {
    return res.sendStatus(403)
  }
  next()
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
