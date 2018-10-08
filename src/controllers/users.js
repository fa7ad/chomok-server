import { omit, reduce } from 'ramda'
import { Router } from 'express'

import { usersdb, HTTPError, errorify } from '../lib/utils'
import { regUser } from '../lib/middleware'

const route = Router()
route.get('/:type?', async (req, res) => {
  try {
    const { type } = req.params
    const { rows } = await usersdb.allDocs({ include_docs: true })
    const onlyOfType = reduce((users, row) => {
      const { doc: user } = row
      if (user.type === type) {
        return [].concat(users, omit(['password'], user))
      }
      return users
    }, [])
    res.json({ ok: true, data: onlyOfType(rows) })
  } catch (e) {
    res
      .status(e.notFound ? 404 : 500)
      .json({ ok: false, error: { message: e.message || 'No users found' } })
  }
})

route.post('/:type?', regUser, async (req, res) => {
  try {
    const rep = await usersdb.post(req.body)
    if (!rep) throw HTTPError(500, 'Internal server error')
    res.json({ ok: true })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
