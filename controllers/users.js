import { omit, compose, prop, map } from 'ramda'
import { Router } from 'express'

import { usersdb } from '../lib/utils'
import { regUser } from '../lib/middleware'

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
    const data = await usersdb.allDocs({ include_docs: true }).then(cleandocs)
    const usersOfType = data.filter(userType[type])
    res.json({ ok: true, data: usersOfType })
  } catch (e) {
    res
      .status(e.notFound ? 404 : 500)
      .json({ ok: false, error: { message: e.message || 'No users found' } })
  }
})

route.post('/:type?', regUser, (req, res) =>
  usersdb
    .post(req.body)
    .then(_ => res.json({ ok: true }))
    .catch(_ =>
      res.status(500).json({
        ok: false,
        error: { message: 'Internal server error' }
      })
    )
)

export default route
