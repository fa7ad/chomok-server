import { omit, compose, prop, map } from 'ramda'
import { Router } from 'express'

import { dbs } from '../lib/init'
import { regUser } from './auth'
const { users } = dbs

const userType = {
  undefined: u => u.username && !u.admin && !u.business,
  user: u => u.username && !u.admin && !u.business,
  partner: u => u.username && !u.admin && u.business,
  admin: u => u.username && u.admin && !u.business
}

const cleandocs = compose(
  map(
    compose(
      omit(['password']),
      prop('doc')
    )
  ),
  prop('rows')
)

const route = Router()
route.get('/:type?', async (req, res) => {
  try {
    const { type } = req.params
    const data = await users.allDocs({ include_docs: true }).then(cleandocs)
    const usersOfType = data.filter(userType[type])
    res.json({ ok: true, data: usersOfType })
  } catch (e) {
    res
      .status(e.notFound ? 404 : 500)
      .json({ ok: false, error: { message: e.message || 'No users found' } })
  }
})

route.post(
  '/:type?',
  (req, res, next) => {
    if (req.params.type === 'admin') {
      Object.assign(req.body, { admin: true, business: undefined })
    } else if (req.params.type === 'partner') {
      Object.assign(req.body, { admin: false })
    }
    next()
  },
  regUser,
  (req, res) =>
    users
      .post({ ...req.body })
      .then(_ => {
        res.json({ ok: true })
      })
      .catch(_ => {
        res.status(500).json({
          ok: false,
          error: { message: 'Internal server error' }
        })
      })
)

export default route
