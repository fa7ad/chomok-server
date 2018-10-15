import Joi from 'joi'
import { getLocalDate } from '../lib/utils'

const offerSchema = Joi.object({
  image: Joi.string().required(),
  zoneid: Joi.string().required(),
  partnerid: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{8}$/)
    .default(getLocalDate, 'Posting Date'),
  offers: Joi.object({
    perc: Joi.object({
      values: Joi.array().items(Joi.number().min(0).max(100)),
      win: Joi.number().min(0).max(100)
    }).default(false),
    special: Joi.object({
      values: Joi.array(),
      win: Joi.string()
    }).default(false),
    bulk: Joi.object({
      values: Joi.array(),
      win: Joi.string()
    }).default(false)
  }),
  reqBy: Joi.array().default([]),
  useBy: Joi.array().default([])
})

export default offerSchema
