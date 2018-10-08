import Joi from 'joi'
import { getLocalDate } from '../lib/utils'

const offerSchema = Joi.object().keys({
  image: Joi.string().required(),
  zoneid: Joi.string().required(),
  partnerid: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{8}$/)
    .default(getLocalDate, 'Posting Date'),
  percentage: Joi.number()
    .required()
    .min(0)
    .max(100),
  reqBy: Joi.array().default([]),
  useBy: Joi.array().default([])
})

export default offerSchema
