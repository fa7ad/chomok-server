import Joi from 'joi'
import { getLocalDate } from '../lib/utils'

const offerSchema = Joi.object({
  image: Joi.string().required(),
  zoneid: Joi.string().required(),
  partnerid: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{8}$/)
    .default(getLocalDate, 'Posting Date'),
  values: Joi.object({
    perc: Joi.array().items(Joi.number().min(0).max(100)).default(false),
    special: Joi.array().default(false),
    bulk: Joi.array().default(false)
  }),
  reqBy: Joi.array().default([]),
  useBy: Joi.array().default([])
})

export default offerSchema
