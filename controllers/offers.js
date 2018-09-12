import { Router } from 'express'
import { map, toLower, omit } from 'ramda'

import offerSchema from '../models/offer'
import { verifyAdmin } from '../lib/middleware'
import {
  zonesdb,
  offersdb,
  onlyDocs,
  errorify,
  findLike,
  findAllLike,
  getLocalDate,
  HTTPError
} from '../lib/utils'

const route = Router()

route.get('/', verifyAdmin, async (req, res) => {
  try {
    const data = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    res.json({ ok: true, data })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No offers found' } })
  }
})

route.get('/:division/:zone', async (req, res) => {
  const isUser = req.user.type === 'user'
  const params = map(toLower, req.params)
  try {
    const allZones = onlyDocs(await zonesdb.allDocs({ include_docs: true }))
    const zone = findLike(params, allZones)
    if (!zone) throw new HTTPError(404, 'No such zone exists')

    const zoneid = zone._id
    const allOffers = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    const matches = findAllLike({ zoneid, date: getLocalDate() }, allOffers)
    const authorize = map(omit(isUser ? ['reqBy', 'useBy'] : []))
    res.json({ ok: true, data: authorize(matches) })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.post('/', verifyAdmin, async (req, res) => {
  try {
    const data = await offerSchema.validate(req.body)
    const rep = await offersdb.post(data)
    if (!rep) throw new HTTPError(500, 'Internal server error')
    res.json({ ok: true })
  } catch (e) {
    const { error, status } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
