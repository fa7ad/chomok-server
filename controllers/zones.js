import { Router } from 'express'
import { filter, propEq, map, toLower } from 'ramda'

import { zonesdb, errorify, cleandocs, HTTPError } from '../lib/utils'
import { verifyAdmin } from '../lib/middleware'
import zoneSchema from '../models/zone'

const lowerAll = map(toLower)
const route = Router()

route.get('/', async (req, res) => {
  try {
    const zoneslist = cleandocs(await zonesdb.allDocs({ include_docs: true }))
    res.json({ ok: true, data: zoneslist })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No zones found' } })
  }
})

route.post('/', verifyAdmin, async (req, res) => {
  const bodyData = lowerAll(req.body)
  try {
    const existing = await zonesdb.find({ selector: { name: bodyData.name } })
    if (existing.docs.length > 0) throw new HTTPError(409, 'Zone already exists')

    const data = await zoneSchema.validate(bodyData)
    const rep = await zonesdb.post(data)
    if (!rep) throw new HTTPError(500, "Didn't insert into database")
    res.json({ ok: true })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.get('/:div', async (req, res) => {
  const { div } = lowerAll(req.params)
  try {
    if (!div) throw new HTTPError(400, 'No division given.')
    const allZones = cleandocs(await zonesdb.allDocs({ include_docs: true }))
    const data = filter(propEq('division', div), allZones)
    res.json({ ok: true, data })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status || 404).json({ ok: false, error })
  }
})

export default route
