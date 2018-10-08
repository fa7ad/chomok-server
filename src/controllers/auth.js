import { Router } from 'express'
import { pickAll, merge } from 'ramda'

import passport from 'passport'

import { regUser } from '../lib/middleware'
import { usersdb } from '../lib/utils'

const route = Router()

route.post('/register', regUser, function (req, res) {
  usersdb
    .post({ ...req.body })
    .then(_ => res.json({ ok: true }))
    .catch(_ =>
      res.status(500).json({
        ok: false,
        error: { message: 'Internal server error' }
      })
    )
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
