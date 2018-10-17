import { Router } from 'express'
import { map, toLower, omit, filter, propEq, prop, compose, merge } from 'ramda'

import offerSchema from '../models/offer'
import { verifyAdmin, verifyLogin } from '../lib/middleware'
import {
  zonesdb,
  offersdb,
  onlyDocs,
  toBase64,
  findLike,
  getLocalDate,
  HTTPError,
  usersdb
} from '../lib/utils'

const route = Router()

route.get('/', verifyLogin, async (req, res, next) => {
  const { type } = req.user
  try {
    if (!/^(partner|admin)$/.test(type)) {
      throw new HTTPError(403, 'Not allowed')
    }
    const onlyTheir = filter(propEq('partnerid', req.user._id))
    const data = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    if (!data) throw new HTTPError(404, 'No offers found')
    const dataPart = await Promise.all(
      data.map(async doc => {
        const partner = prop('business')(await usersdb.get(doc.partnerid))
        const zone = await zonesdb.get(doc.zoneid)
        return { partner, zone, ...doc }
      })
    )
    res.json({
      ok: true,
      data: type === 'partner' ? onlyTheir(dataPart) : dataPart
    })
  } catch (err) {
    next(err)
  }
})

route.get('/:division/:name', async (req, res, next) => {
  const params = map(toLower, req.params)
  try {
    const allZones = onlyDocs(await zonesdb.allDocs({ include_docs: true }))
    const zone = findLike(params, allZones)
    if (!zone) throw new HTTPError(404, 'No such zone exists')

    const zoneid = zone._id
    const allOffers = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    const match = findLike({ zoneid, date: getLocalDate() }, allOffers)
    if (!match) {
      throw new HTTPError(
        404,
        "There's no offer for this region, at the moment"
      )
    }
    const { business: partner } = await usersdb.get(match.partnerid)

    const cleanup = compose(
      merge({ partner }),
      omit(['reqBy', 'useBy'])
    )

    if (req.user) {
      const code = findLike({ id: req.user._id }, match.reqBy)
      match.code = code
    }
    const data = cleanup(match)

    res.json({ ok: true, data })
  } catch (err) {
    next(err)
  }
})

route.post('/', verifyAdmin, async (req, res, next) => {
  try {
    const data = await offerSchema.validate(req.body)
    await offersdb.put({
      _id: data.zoneid + '_' + toBase64(data.date),
      ...data
    })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

route.delete('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const data = await offersdb.get(req.params.id)
    await offersdb.remove(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default route
