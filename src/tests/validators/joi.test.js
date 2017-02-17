const nameValidator = require('../../app/validators/name')
const test = require('tape')

test('Name Validator: Ensure that name supplied is valid', t => {
  const tester = {
    first: 'Mike',
    middle: 'Jon',
    last: 'Testaverde'
  }

  const result = nameValidator.validate(tester)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.error(result.error, 'Validation result should be empty')
  t.deepEqual(result.value, tester, 'The name objects should be the same')
  t.end()
})

test('Name Validator: Ensure that first name supplied breaks empty validation', t => {
  const tester = {
    first: '',
    middle: 'Jon',
    last: 'Testaverde'
  }

  const result = nameValidator.validate(tester)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const { details } = result.error
  const first = details[0]

  t.equal(first.message, '"first" is not allowed to be empty', 'Validation error message should be correct')
  t.equal(first.path, 'first', 'Validation error property should be "first"')
  t.deepEqual(result.value, tester, 'The name objects should be the same')
  t.end()
})

test('Name Validator: Ensure that first name supplied breaks max length validation', t => {
  const tester = {
    first: '123456789123456789123456789123456789123456789123456789',
    middle: 'Jon',
    last: 'Testaverde'
  }

  const result = nameValidator.validate(tester)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const { details } = result.error
  const first = details[0]

  t.equal(first.message, '"first" length must be less than or equal to 50 characters long', 'Validation error message should be correct')
  t.equal(first.path, 'first', 'Validation error property should be "first"')
  t.deepEqual(result.value, tester, 'The name objects should be the same')
  t.end()
})

test('Name Validator: Ensure that last name supplied breaks min length validation', t => {
  const tester = {
    first: 'Justin',
    middle: 'Jon',
    last: 'T'
  }

  const result = nameValidator.validate(tester)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const { details } = result.error
  const last = details[0]

  t.equal(last.message, '"last" length must be at least 2 characters long', 'Validation error message should be correct')
  t.equal(last.path, 'last', 'Validation error property should be "last"')
  t.deepEqual(result.value, tester, 'The name objects should be the same')
  t.end()
})

test('Name Validator: Cause more than one validation error', t => {
  const tester = {
    first: '',
    middle: 'Jon',
    last: ''
  }

  const result = nameValidator.validate(tester)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const { details } = result.error
  console.log(result)
  t.equal(details[0].message, '"first" is not allowed to be empty', 'Validation error message should be correct')
  t.equal(details[0].path, 'first', 'Validation error property should be "first"')

  // t.equal(details[1].message, '"last" is not allowed to be empty', 'Validation error message should be correct')
  // t.equal(details[1].path, 'last', 'Validation error property should be "last"')

  t.deepEqual(result.value, tester, 'The name objects should be the same')
  t.end()
})
