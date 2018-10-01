import { Router } from 'express'
import { map, toLower, omit, filter, propEq, prop, compose, merge } from 'ramda'

import offerSchema from '../models/offer'
import { verifyAdmin, verifyLogin } from '../lib/middleware'
import {
  zonesdb,
  offersdb,
  onlyDocs,
  errorify,
  toBase64,
  findLike,
  getLocalDate,
  HTTPError,
  usersdb
} from '../lib/utils'

const route = Router()

route.get('/', verifyLogin, async (req, res) => {
  const { type } = req.user
  try {
    if (!/^(partner|admin)$/.test(type)) {
      throw new HTTPError(403, 'Not allowed')
    }
    const onlyTheir = filter(propEq('partnerid', req.user._id))
    const data = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    if (!data) throw new HTTPError(404, 'No offers found')
    res.json({
      ok: true,
      data: type === 'partner' ? onlyTheir(data) : data
    })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.get('/:division/:name', async (req, res) => {
  const params = map(toLower, req.params)
  try {
    const allZones = onlyDocs(await zonesdb.allDocs({ include_docs: true }))
    const zone = findLike(params, allZones)
    if (!zone) throw new HTTPError(404, 'No such zone exists')

    const zoneid = zone._id
    const allOffers = onlyDocs(await offersdb.allDocs({ include_docs: true }))
    const match = findLike({ zoneid, date: getLocalDate() }, allOffers)
    const partner = prop('business')(await usersdb.get(match.partnerid))
    if (!partner) throw new HTTPError(500, 'Not a valid offer')

    const cleanup = compose(
      merge({ partner }),
      omit(['reqBy', 'useBy'])
    )
    res.json({ ok: true, data: cleanup(match) })
  } catch (e) {
    const { status, error } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

route.post('/', verifyAdmin, async (req, res) => {
  try {
    const data = await offerSchema.validate(req.body)
    const rep = await offersdb.put({
      _id: data.zoneid + '_' + toBase64(data.date),
      ...data
    })
    if (!rep) throw new HTTPError(500, 'Internal server error')
    res.json({ ok: true })
  } catch (e) {
    const { error, status } = errorify(e)
    res.status(status).json({ ok: false, error })
  }
})

export default route
