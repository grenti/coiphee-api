const amenityValidator = require('../../app/validators/amenity')
const test = require('tape')

test('Amenity Validator: Ensure that amenity supplied is valid', t => {
  const amenity = {
    name: 'Hair Cut',
    offering: ['Fade', 'MoHawk', 'Bald']
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.error(result.error, 'Validation result should be empty')
  t.deepEqual(result, amenity, 'The amenity objects should be the same')
  t.end()
})

test('Amenity Validator: Ensure that the name supplied breaks empty validation', t => {
  const amenity = {
    name: undefined,
    offering: ['Fade', 'Bald', 'Braids']
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const name = result.error

  t.equal(name.message, '"name" is required', 'Validation error message should be correct')
  t.equal(name.path, 'name', 'Validation error property should be "name"')
  t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
  t.end()
})

test('Amenity Validator: Ensure that the name supplied breaks max length validation', t => {
  const amenity = {
    name: "Traditional Men's Hair Cut & Shave",
    offering: ['Fade', 'Bald', 'Braids']
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const name = result.error

  t.equal(name.message, '"name" length must be less than or equal to 25 characters long', 'Validation error message should be correct')
  t.equal(name.path, 'name', 'Validation error property should be "name"')
  t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
  t.end()
})

test('Amenity Validator: Ensure that the name supplied breaks min length validation', t => {
  const amenity = {
    name: 'Ha',
    offering: ['Fade', 'MoHawk', 'Bald']
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const name = result.error

  t.equal(name.message, '"name" length must be at least 3 characters long', 'Validation error message should be correct')
  t.equal(name.path, 'name', 'Validation error property should be "name"')
  t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
  t.end()
})

test('Amenity Validator: Ensure that the offering supplied breaks min length validation', t => {
  const amenity = {
    name: 'Hair',
    offering: []
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const offering = result.error

  t.equal(offering.message, '"offering" must contain at least 1 items', 'Validation error message should be correct')
  t.equal(offering.path, 'offering', 'Validation error property should be "offering"')
  t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
  t.end()
})

test('Amenity Validator: Ensure that the offering supplied breaks min length validation', t => {
  const amenity = {
    name: 'Hair',
    offering: undefined
  }

  const result = amenityValidator.validate(amenity)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const offering = result.error

  t.equal(offering.message, '"offering" is required', 'Validation error message should be correct')
  t.equal(offering.path, 'offering', 'Validation error property should be "offering"')
  t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
  t.end()
})

// test('Amenity Validator: Ensure that type has a validation error', t => {
//   const amenity = {
//     type: 'ice',
//     number: '23345321'
//   }

//   const result = amenityValidator.validate(amenity)
//   t.notEqual(result, null, "Validation shouldn't return an empty object")
//   t.notEqual(result.error, "Validation result shouldn't be empty")
//   // console.log(result.error)
//   const { error } = result
//   t.equal(error.message, '"type" length must be at least 4 characters long', 'Validation error message should be correct')
//   t.equal(error.path, 'type', 'Validation error property should be "type"')

//   // t.equal(details[1].message, '"last" is not allowed to be empty', 'Validation error message should be correct')
//   // t.equal(details[1].path, 'last', 'Validation error property should be "last"')

//   t.deepEqual(result.object, amenity, 'The amenity objects should be the same')
//   t.end()
// })
