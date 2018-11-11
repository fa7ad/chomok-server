import Joi from 'joi'
import { getLocalDate } from '../lib/utils'

const userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required(),
  phone: Joi.string()
    .regex(/^(\+88|0088)?0?(1[5-9])?\d{8}$/)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .token()
    .lowercase()
    .min(4)
    .required(),
  password: Joi.string()
    .min(6)
    .max(32)
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
  type: Joi.string()
    .valid(['admin', 'partner', 'user'])
    .default(ctx => {
      if (ctx.admin) return 'admin'
      if (ctx.business) return 'partner'
      return 'user'
    }, 'user type')
})

export default userSchema
