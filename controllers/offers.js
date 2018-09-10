import { Router } from 'express'
import { omit } from 'ramda'

// import offerSchema from '../models/offer'
import { offersdb, cleandocs } from '../lib/utils'

const route = Router()

route.get('/', async (req, res) => {
  try {
    const allDocs = cleandocs(await offersdb.allDocs({ include_docs: true }))
    const data = req.user.admin ? allDocs : omit(['usedBy'], allDocs)
    res.json({ ok: true, data })
  } catch (e) {
    res.status(404).json({ ok: false, error: { message: 'No offers found' } })
  }
})

export default route
