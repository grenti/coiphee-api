const locationValidator = require('../../app/validators/location')
const test = require('tape')

test('Location Validator: Ensure that location supplied is valid', t => {
  const location = {
    street: '123 Okomobong Road',
    addtional: 'Suite 14',
    city: 'SkillSets',
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.error(result.error, 'Validation result should be empty')
  t.deepEqual(result, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the stret supplied breaks empty validation', t => {
  const location = {
    street: undefined,
    addtional: 'Suite 14',
    city: 'SkillSets',
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const street = result.error

  t.equal(street.message, '"street" is required', 'Validation error message should be correct')
  t.equal(street.path, 'street', 'Validation error property should be "street"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the street supplied breaks max length validation', t => {
  const location = {
    street: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
      'Aenean commodo ligula eget dolor.Aenean massa. Cum sociis natoque penatibus ' +
      'et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ' +
      'ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis ' +
      'et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ' +
      'ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis ' +
      'enim.Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ',
    addtional: 'Suite 14',
    city: 'SkillSets',
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const street = result.error

  t.equal(street.message, '"street" length must be less than or equal to 256 characters long',
    'Validation error message should be correct')
  t.equal(street.path, 'street', 'Validation error property should be "street"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the street supplied breaks min length validation', t => {
  const location = {
    street: '123 Min',
    addtional: 'Suite 14',
    city: 'SkillSets',
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const street = result.error

  t.equal(street.message, '"street" length must be at least 8 characters long', 'Validation error message should be correct')
  t.equal(street.path, 'street', 'Validation error property should be "street"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the city supplied breaks empty validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: undefined,
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const city = result.error

  t.equal(city.message, '"city" is required', 'Validation error message should be correct')
  t.equal(city.path, 'city', 'Validation error property should be "city"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the city supplied breaks min length validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tu',
    state: 'GA',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const city = result.error

  t.equal(city.message, '"city" length must be at least 3 characters long', 'Validation error message should be correct')
  t.equal(city.path, 'city', 'Validation error property should be "city"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

// test('Location Validator: Ensure that the city supplied breaks max length validation', t => {
//   const location = {
//     street: '123 Njama-njama Curb',
//     addtional: 'Suite 14',
//     city: 'Tuafaskldakfdsajfksdjfksdjfakjsdkf' +
//       'TuafaskldakfdsajfksdjfksdjfakjsdkfTuafaskldakfdsajfksdjfksdjfakjsdkf' +
//       'TuafaskldakfdsajfksdjfksdjfakjsdkfTuafaskldakfdsajfksdjfksdjfakjsdkf' +
//       'TuafaskldakfdsajfksdjfksdjfakjsdkfTuafaskldakfdsajfksdjfksdjfakjsdkf' +
//       'Tuafaskldakfdsajfksdjfksdjfakjsdkfjksadjfksdjkfjdskajfeiiqereadakfjdkfasfasf',
//     state: 'GA',
//     zip: '31122-9887'
//   }

//   const result = locationValidator.validate(location)
//   t.notEqual(result, null, "Validation shouldn't return an empty object")
//   t.notEqual(result.error, "Validation result shouldn't be empty")
//   // console.log(result.error)
//   const city = result.error

//   t.equal(city.message, '"city" must be less than 128 characters', 'Validation error message should be correct')
//   t.equal(city.path, 'city', 'Validation error property should be "city"')
//   t.deepEqual(result.object, location, 'The location objects should be the same')
//   t.end()
// })

test('Location Validator: Ensure that the state supplied breaks empty validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: undefined,
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const state = result.error

  t.equal(state.message, '"state" is required', 'Validation error message should be correct')
  t.equal(state.path, 'state', 'Validation error property should be "state"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the state supplied breaks min length validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: 'G',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const state = result.error

  t.equal(state.message, '"state" length must be at least 2 characters long', 'Validation error message should be correct')
  t.equal(state.path, 'state', 'Validation error property should be "state"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the state supplied breaks max length validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: 'GAP',
    zip: '31122-9887'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const state = result.error

  t.equal(state.message, '"state" length must be less than or equal to 2 characters long', 'Validation error message should be correct')
  t.equal(state.path, 'state', 'Validation error property should be "state"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the zip supplied breaks empty validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: 'GA',
    zip: undefined
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const zip = result.error

  t.equal(zip.message, '"zip" is required', 'Validation error message should be correct')
  t.equal(zip.path, 'zip', 'Validation error property should be "zip"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the zip supplied breaks min length validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: 'GA',
    zip: '3112'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const zip = result.error

  t.equal(zip.message, '"zip" length must be at least 5 characters long', 'Validation error message should be correct')
  t.equal(zip.path, 'zip', 'Validation error property should be "zip"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

test('Location Validator: Ensure that the state supplied breaks max length validation', t => {
  const location = {
    street: '123 Njama-njama Curb',
    addtional: 'Suite 14',
    city: 'Tucker',
    state: 'GA',
    zip: '311224-98873'
  }

  const result = locationValidator.validate(location)
  t.notEqual(result, null, "Validation shouldn't return an empty object")
  t.notEqual(result.error, "Validation result shouldn't be empty")
  // console.log(result.error)
  const zip = result.error

  t.equal(zip.message, '"zip" length must be less than or equal to 10 characters long', 'Validation error message should be correct')
  t.equal(zip.path, 'zip', 'Validation error property should be "zip"')
  t.deepEqual(result.object, location, 'The location objects should be the same')
  t.end()
})

// test('Location Validator: Ensure that type has a validation error', t => {
//   const location = {
//     type: 'ice',
//     number: '23345321'
//   }

//   const result = locationValidator.validate(location)
//   t.notEqual(result, null, "Validation shouldn't return an empty object")
//   t.notEqual(result.error, "Validation result shouldn't be empty")
//   // console.log(result.error)
//   const { error } = result
//   t.equal(error.message, '"type" length must be at least 4 characters long', 'Validation error message should be correct')
//   t.equal(error.path, 'type', 'Validation error property should be "type"')

//   // t.equal(details[1].message, '"last" is not allowed to be empty', 'Validation error message should be correct')
//   // t.equal(details[1].path, 'last', 'Validation error property should be "last"')

//   t.deepEqual(result.object, location, 'The location objects should be the same')
//   t.end()
// })
