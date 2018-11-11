import { Router } from 'express'
import { filter, propEq, map, toLower } from 'ramda'

import { zonesdb, onlyDocs, HTTPError } from '../lib/utils'
import { verifyAdmin } from '../lib/middleware'
import zoneSchema from '../models/zone'

const lowerAll = map(toLower)
const route = Router()

route.get('/', async (req, res) => {
  try {
    const zoneslist = onlyDocs(await zonesdb.allDocs({ include_docs: true }))
    res.json({ ok: true, data: zoneslist })
  } catch (err) {
    res.status(404).json({ ok: false, error: { message: 'No zones found' } })
  }
})

route.post('/', verifyAdmin, async (req, res, next) => {
  const bodyData = lowerAll(req.body)
  try {
    const existing = await zonesdb.find({ selector: { name: bodyData.name } })
    if (existing.docs.length > 0) {
      throw new HTTPError(409, 'Zone already exists')
    }

    const data = await zoneSchema.validate(bodyData)
    await zonesdb.post(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

route.get('/:div', async (req, res, next) => {
  const { div } = lowerAll(req.params)
  try {
    if (!div) throw new HTTPError(400, 'No division given.')
    const allZones = onlyDocs(await zonesdb.allDocs({ include_docs: true }))
    const data = filter(propEq('division', div), allZones)
    res.json({ ok: true, data })
  } catch (err) {
    next(err)
  }
})

route.delete('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const data = await zonesdb.get(req.params.id)
    await zonesdb.remove(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default route
