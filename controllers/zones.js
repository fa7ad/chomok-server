import { Router } from 'express'
import { compose, map, filter, prop, propEq } from 'ramda'

import { zonesdb, errorify } from '../lib/utils'
import { zoneSchema } from '../models/zone'
import { verifyAdmin } from '../lib/middleware'

const route = Router()
const cleandocs = compose(
  map(prop('doc')),
  prop('rows')
)

route.get('/', async (req, res) => {
  try {
    const zoneslist = cleandocs(await zonesdb.allDocs())
    res.json({ ok: true, data: zoneslist })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No zones found' } })
  }
})

route.post('/', verifyAdmin, async (req, res) => {
  try {
    const data = await zoneSchema.validate(req.body)
    const rep = await zonesdb.post(data)
    if (!rep) throw new Error("Didn't insert into database")
    res.json({ ok: true })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.get('/:div', async (req, res) => {
  const { div } = req.params
  try {
    if (!div) throw new Error('No division given.')
    const allZones = cleandocs(await zonesdb.allDocs)
    const data = filter(propEq('division', div), allZones)
    res.json({ ok: true, data })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No zones found' } })
  }
})

export default route
