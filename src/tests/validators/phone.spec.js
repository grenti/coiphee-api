const phoneValidator = require('../../app/validators/phone')
const test = require('tape')

test('Phone Validator: Ensure that phone supplied is valid', t => {
  const phone = {
    type: 'cell',
    number: '8923345321'
  }

  const result = phoneValidator.validate(phone)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.error(result.error, 'Validation result should be empty')
  t.deepEqual(result, phone, 'amenity')
  t.end()
})

test('Phone Validator: Ensure that the number supplied breaks empty validation', t => {
  const phone = {
    type: 'home',
    number: ''
  }

  const result = phoneValidator.validate(phone)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const number = result.error

  t.equal(number.message, '"number" is not allowed to be empty', 'Validation error message should be correct')
  t.equal(number.path, 'number', 'Validation error property should be "number"')
  t.deepEqual(result.object, phone, 'amenity')
  t.end()
})

test('Phone Validator: Ensure that the number supplied breaks max length validation', t => {
  const phone = {
    type: 'home',
    number: '78923345321'
  }

  const result = phoneValidator.validate(phone)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const number = result.error

  t.equal(number.message, '"number" length must be less than or equal to 10 characters long', 'Validation error message should be correct')
  t.equal(number.path, 'number', 'Validation error property should be "number"')
  t.deepEqual(result.object, phone, 'amenity')
  t.end()
})

test('Phone Validator: Ensure that the number supplied breaks min length validation', t => {
  const phone = {
    type: 'office',
    number: '23345321'
  }

  const result = phoneValidator.validate(phone)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const number = result.error

  t.equal(number.message, '"number" length must be at least 10 characters long', 'Validation error message should be correct')
  t.equal(number.path, 'number', 'Validation error property should be "number"')
  t.deepEqual(result.object, phone, 'amenity')
  t.end()
})

test('Phone Validator: Ensure that type has a validation error', t => {
  const phone = {
    type: 'ice',
    number: '23345321'
  }

  const result = phoneValidator.validate(phone)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const { error } = result
  t.equal(error.message, '"type" length must be at least 4 characters long', 'Validation error message should be correct')
  t.equal(error.path, 'type', 'Validation error property should be "type"')

  // t.equal(details[1].message, '"last" is not allowed to be empty', 'Validation error message should be correct')
  // t.equal(details[1].path, 'last', 'Validation error property should be "last"')

  t.deepEqual(result.object, phone, 'amenity')
  t.end()
})
