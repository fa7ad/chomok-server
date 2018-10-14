import random from 'random'
import shortid from 'shortid'
import { Router } from 'express'
import { merge, uniq } from 'ramda'
import { verifyLogin } from '../lib/middleware'
import {
  offersdb,
  HTTPError,
  errorify,
  codesdb,
  getLocalDate,
  onlyDocs,
  findLike
} from '../lib/utils'

const route = Router()

route.get('/:offerid/:offertype', async (req, res) => {
  try {
    const { offertype, offerid } = req.params

    const doc = await offersdb.get(offerid)
    if (!doc) throw new HTTPError(404, 'No such offer')
    if (doc.date !== getLocalDate()) throw new HTTPError(400, 'Offer expired')
    if (!doc.values[offertype]) throw new HTTPError(404, 'Invalid offer type')

    const rep = await offersdb.put(
      merge(doc, { reqBy: uniq([].concat(doc.reqBy, req.user._id)) })
    )
    if (!rep) throw new HTTPError(500, 'Internal server error')

    const all = onlyDocs(await codesdb.allDocs({ include_docs: true }))
    const existing = findLike({
      offerid: offerid,
      userid: req.user._id
    })(all)

    let code = existing._id
    let value = existing.value
    if (!code) {
      const offers = doc.values[offertype]
      value = random.int(0, offers.length)
      code = shortid.generate()
      const rep = await codesdb.put({
        _id: code,
        offerid: offerid,
        userid: req.user._id,
        validity: doc.date,
        offertype,
        value
      })
      if (!rep) throw new HTTPError(500, 'Internal server error')
    }
    res.json({
      ok: true,
      data: { code, value }
    })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.get('/_/:promoid', verifyLogin, async (req, res) => {
  try {
    const code = await codesdb.get(req.params.promoid)
    if (!code) throw new HTTPError(404, 'Invalid promo code')
    if (!req.user._id === code.userid) throw new HTTPError(403, 'Forbidden')
    res.send(code.value)
  } catch (e) {
    const { status } = errorify(e)
    res.sendStatus(status)
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
      res.json({ ok: true, data: { value: code.value } })
    } else throw new HTTPError(400, 'Invalid/expired promo code')
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
