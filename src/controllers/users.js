import { omit, reduce } from 'ramda'
import { Router } from 'express'

import { usersdb, errorify } from '../lib/utils'
import { regUser, verifyAdmin } from '../lib/middleware'

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
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.post('/:type?', regUser, async (req, res) => {
  try {
    await usersdb.post(req.body)
    res.json({ ok: true })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const data = await usersdb.get(req.params.id)
    await usersdb.remove(data)
    res.json({ ok: true })
  } catch (e) {
    const { error, status } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
