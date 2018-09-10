import Joi from 'joi'
import { DateTime } from 'luxon'

const offerSchema = Joi.object().keys({
  image: Joi.string(),
  zoneid: Joi.string().required(),
  partnerid: Joi.string().required(),
  date: Joi.string()
    .regex(/(\d{6}|\d{8})/)
    .default(
      () => DateTime.local().toFormat('yyyyLLdd'),
      'current date is the defaut'
    ),
  percentage: Joi.number()
    .required()
    .min(0)
    .max(100)
})

export default offerSchema
