import { Router } from 'express'
import { merge, uniq } from 'ramda'
import shortid from 'shortid'
import qr from 'qrcode'
import { offersdb, HTTPError, errorify } from '../lib/utils'

const route = Router()

route.get('/:offerid', async (req, res) => {
  try {
    const doc = await offersdb.get(req.params.offerid)
    const rep = await offersdb.put(
      merge(doc, { reqBy: uniq([].concat(doc.reqBy, req.user._id)) })
    )
    if (!rep) throw new HTTPError(500, 'Internal server error')
    const code = shortid.generate()
    const ins = await offersdb.put({
      _id: code,
      offerid: req.params.offerid,
      validity: doc.date,
      value: doc.percentage
    })
    if (!ins) throw new HTTPError(500, 'Internal server error')
    res.json({ ok: true, data: { code, qr: await qr.toDataURL(code) } })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
