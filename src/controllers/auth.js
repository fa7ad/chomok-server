import { Router } from 'express'
import { pickAll } from 'ramda'

import passport from 'passport'

import { regUser } from '../lib/middleware'
import { usersdb, errorify } from '../lib/utils'

const route = Router()

route.post('/register', regUser, async function (req, res) {
  try {
    await usersdb.post(req.body)
    res.json({ ok: true })
  } catch (err) {
    errorify(err, res)
  }
})

route.post('/login', passport.authenticate('local', {}), function (req, res) {
  res.json({ ok: true, id: req.user._id, type: req.user.type })
})

route.get('/loggedIn', (req, res) =>
  res.json({ ok: !!req.user, ...pickAll(['type', 'username'], req.user || {}) })
)

route.get('/logout', function (req, res) {
  req.logout()
  res.json({ ok: true })
})

export default route
