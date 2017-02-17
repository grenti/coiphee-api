const proficiencyValidator = require('../../app/validators/proficiency')
const test = require('tape')

test('Proficiency Validator: Ensure that proficiency supplied is valid', t => {
  const proficiency = ['Fades', 'Locks', 'Bald']

  const result = proficiencyValidator.validate(proficiency)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.error(result.error, 'Validation result should be empty')
  t.deepEqual(result, proficiency, 'The proficiency objects should be the same')
  t.end()
})

test('Proficiency Validator: Ensure that the proficiency supplied breaks empty validation', t => {
  const prof = undefined

  const result = proficiencyValidator.validate(prof)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")

  const proficiency = result.error

  t.equal(proficiency.message, '"value" is required', 'Validation error message should be correct')
  t.equal(proficiency.path, 'value', 'Validation error property should be "value"')
  t.deepEqual(result.object, undefined, 'The proficiency objects should be the same')
  t.end()
})

test('Proficiency Validator: Ensure that the proficiency supplied breaks min length validation', t => {
  const prof = ['Fad']

  const result = proficiencyValidator.validate(prof)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")

  const proficiency = result.error

  t.equal(proficiency.message, '"0" length must be at least 4 characters long', 'Validation error message should be correct')
  t.equal(proficiency.path, '0', 'Validation error property should be "0"')
  t.deepEqual(result.object, prof, 'The proficiency objects should be the same')
  t.end()
})

test('Proficiency Validator: Ensure that the proficiency supplied breaks min length validation', t => {
  const prof = []

  const result = proficiencyValidator.validate(prof)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")

  const proficiency = result.error

  t.equal(proficiency.message, '"value" must contain at least 1 items', 'Validation error message should be correct')
  t.equal(proficiency.path, 'value', 'Validation error property should be "value"')
  t.deepEqual(result.object, prof, 'The proficiency objects should be the same')
  t.end()
})
