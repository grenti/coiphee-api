const Joi = require('joi')
const factory = require('./joiResultFactory')

const schema = Joi.array().items(
  Joi.string().min(4)
).min(1).required()

class ProficiencyValidator {
  static validate (proficiencies) {
    const result = Joi.validate(proficiencies, schema)
    return factory(result)
  }
}

module.exports = exports = ProficiencyValidator
