import { Router } from 'express'
// import { compose, map, filter, prop, propEq } from 'ramda'

import { offersdb, cleandocs } from '../lib/utils'
// import { zoneSchema } from '../models/zone'
// import { verifyAdmin } from '../lib/middleware'

const route = Router()

route.get('/', async (req, res) => {
  try {
    const allDocs = cleandocs(await offersdb.allDocs({ include_docs: true }))
    res.json({ ok: true, data: allDocs })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No offers found' } })
  }
})

export default route
