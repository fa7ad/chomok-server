import Joi from 'joi'
import { getLocalDate } from '../lib/utils'

const userSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-z\s]+$/)
    .min(3)
    .required(),
  phone: Joi.string()
    .regex(/^(\+88|0088)?0(1[5-9])?\d{8}$/)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .lowercase()
    .regex(/^[a-z][^\s]{4,}$/)
    .required(),
  password: Joi.string()
    .required()
    .regex(/^(?=.*\d).{6,32}$/)
    .required(),
  dateReg: Joi.string()
    .regex(/^\d{8}$/)
    .default(getLocalDate, 'Registration date'),
  admin: Joi.boolean().default(false),
  business: Joi.object()
    .keys({
      address: Joi.string(),
      name: Joi.string(),
      phone: Joi.string().regex(/^(\+88|0088)?0(1[5-9])?\d{8}$/)
    })
    .requiredKeys(['address', 'name', 'phone']),
  type: Joi.string().default(
    ctx => (ctx.admin ? 'admin' : ctx.business ? 'partner' : 'user'),
    'derived user type'
  )
})

export default userSchema
