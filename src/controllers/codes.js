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

route.get('/:offerid/:offertype', async (req, res, next) => {
  try {
    const { offertype, offerid } = req.params

    const doc = await offersdb.get(offerid)
    if (!doc) throw new HTTPError(404, 'No such offer')
    if (doc.date !== getLocalDate()) throw new HTTPError(400, 'Offer expired')
    if (!doc.offers[offertype]) throw new HTTPError(404, 'Invalid offer type')

    const all = onlyDocs(await codesdb.allDocs({ include_docs: true }))
    const existing = findLike({
      offerid: offerid,
      userid: req.user._id
    })(all)

    const reqBy = uniq([...doc.reqBy, { id: req.user._id, type: offertype }])
    await offersdb.put(merge(doc, { reqBy }))

    let code = existing?._id
    let value = existing?.value
    if (!code) {
      const offers = doc.offers[offertype]
      value = offers.win
      const res = await codesdb.put({
        _id: shortid.generate(),
        offerid: offerid,
        userid: req.user._id,
        validity: doc.date,
        offertype,
        offers: offers.values,
        value
      })
      code = res.id
    }
    res.json({
      ok: true,
      data: { code, value, offertype }
    })
  } catch (err) {
    next(err)
  }
})

route.get('/:promoid', verifyLogin, async (req, res) => {
  try {
    const code = await codesdb.get(req.params.promoid)
    if (!code) {
      throw new HTTPError(404, 'Invalid promo code')
    }
    if (!req.user._id === code.userid) throw new HTTPError(403, 'Forbidden')
    res.json(code.value)
  } catch (err) {
    res.sendStatus(errorify(err).status)
  }
})

route.post('/:promoid', verifyLogin, async (req, res, next) => {
  try {
    if (!req.user?.type === 'partner') {
      throw new HTTPError(403, 'Only partners are allowed to verify')
    }
    const code = await codesdb.get(req.params.promoid)
    if (!code) throw new HTTPError(404, 'Invalid promo code')
    if (code.validity === getLocalDate()) {
      const offer = await offersdb.get(code.offerid)
      const useBy = uniq([...offer.useBy, code.userid])

      await offersdb.put(merge(offer, { useBy }))

      const { offertype, validity } = code
      const value = code.offers[code.value]
      res.json({ ok: true, data: { offertype, value, validity } })
    } else throw new HTTPError(400, 'Invalid/expired promo code')
  } catch (err) {
    next(err)
  }
})

export default route
