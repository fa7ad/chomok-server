import { DateTime } from 'luxon'
import Joi from 'joi'

export const userSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[a-zA-z\s]+$/)
    .min(3)
    .required(),
  phone: Joi.string()
    .regex(/^(\+88|0088)?01[5-9]\d{8}$/)
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
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .required(),
  dateReg: Joi.string()
    .regex(/^(\d{6}|\d{8})$/)
    .default(
      () => DateTime.local().toFormat('yyyyLLdd'),
      'defaults to local date'
    ),
  admin: Joi.boolean().default(false),
  business: Joi.object()
    .keys({
      address: Joi.string(),
      name: Joi.string(),
      phone: Joi.string().regex(/^(\+88|0088)?0(1[5-9]|2)\d{8}$/)
    })
    .requiredKeys(['address', 'name', 'phone']),
  type: Joi.string()
    .default(
      ctx => (ctx.admin ? 'admin' : ctx.business ? 'partner' : 'user'),
      'derived user type'
    )
})
