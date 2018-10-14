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

    const reqBy = uniq([...doc.reqBy, req.user._id])
    await offersdb.put(merge(doc, { reqBy }))

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
      await codesdb.put({
        _id: code,
        offerid: offerid,
        userid: req.user._id,
        validity: doc.date,
        offertype,
        value
      })
    }
    res.json({
      ok: true,
      data: { code, value }
    })
  } catch (err) {
    errorify(err, res)
  }
})

route.get('/_/:promoid', verifyLogin, async (req, res) => {
  try {
    const code = await codesdb.get(req.params.promoid)
    if (!code) throw new HTTPError(404, 'Invalid promo code')
    if (!req.user._id === code.userid) throw new HTTPError(403, 'Forbidden')
    res.send(code.value)
  } catch (err) {
    res.sendStatus(errorify(err).status)
  }
})

route.post('/:promoid', async (req, res) => {
  try {
    if (!req.user.type === 'partner') {
      throw HTTPError(401, 'Only partners are allowed to verify')
    }
    const code = await codesdb.get(req.params.promoid)
    if (!code) throw new HTTPError(404, 'Invalid promo code')
    if (code.validity === getLocalDate()) {
      const offer = await offersdb.get(code.offerid)
      const useBy = uniq([...offer.useBy, code.userid])

      await offersdb.put(merge(offer, { useBy }))
      res.json({ ok: true, data: { value: code.value } })
    } else throw new HTTPError(400, 'Invalid/expired promo code')
  } catch (err) {
    errorify(err, res)
  }
})

export default route
