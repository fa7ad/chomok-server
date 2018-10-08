import Joi from 'joi'

const zoneSchema = Joi.object().keys({
  name: Joi.string().required(),
  division: Joi.string().required()
})

export default zoneSchema
