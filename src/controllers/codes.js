import { Router } from 'express'
import { merge, uniq } from 'ramda'
import shortid from 'shortid'
import qr from 'qrcode'
import {
  offersdb,
  HTTPError,
  errorify,
  codesdb,
  getLocalDate
} from '../lib/utils'

const route = Router()

route.get('/:offerid', async (req, res) => {
  try {
    const doc = await offersdb.get(req.params.offerid)
    if (doc.date !== getLocalDate()) {
      throw new HTTPError(400, 'Offer not valid for the date')
    }

    const rep = await offersdb.put(
      merge(doc, { reqBy: uniq([].concat(doc.reqBy, req.user._id)) })
    )
    if (!rep) throw new HTTPError(500, 'Internal server error')
    let code = {}
    const { docs } = await codesdb.find({
      selector: {
        offerid: req.params.offerid,
        userid: req.user._id
      }
    })
    if (docs.length > 0) {
      code = docs[0]._id
    } else {
      code = shortid.generate()
      const rep = await codesdb.put({
        _id: code,
        offerid: req.params.offerid,
        userid: req.user._id,
        validity: doc.date,
        value: doc.percentage
      })
      if (!rep) throw new HTTPError(500, 'Internal server error')
    }
    res.json({
      ok: true,
      data: { code, qr: await qr.toDataURL('chomok://' + code) }
    })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.post('/:promoid', async (req, res) => {
  try {
    if (!req.user.type === 'partner') {
      throw HTTPError(401, 'Only partners are allowed to verify')
    }
    const code = await codesdb.get(req.params.promoid)
    if (!code) throw new HTTPError(404, 'Invalid promo code')
    const sameUser = req.user._id === code.userid
    const valid = getLocalDate() === code.validity
    if (sameUser && valid) {
      const offer = await offersdb.get(code.offerid)
      const rep = await offersdb.put(
        merge(offer, { useBy: uniq([].concat(offer.useBy, req.user._id)) })
      )
      if (!rep) throw new HTTPError(500, 'Internal server error')
      res.json({ ok: true, data: { percentage: code.value } })
    } else throw new HTTPError(400, 'Invalid/expired promo code')
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
