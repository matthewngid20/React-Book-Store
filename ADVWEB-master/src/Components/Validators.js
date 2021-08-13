
export function emailValidator(email) {
  let errors = []
  if (email.indexOf('@') === 0) {
    errors.push('Please insert a valid email.')
  }
  if (email.indexOf('@') === -1) {
    errors.push('Please insert a valid email.')
  }
  if (email.split('.').length < 2) {
    errors.push('Please insert a valid email.')
  }

  if (errors.length === 0) {
    return { valid: true, errors: errors }
  }
  else {
    return { valid: false, errors: errors }
  }
}

export function passwordValidator(password) {
  let errors = []
  // Password length validator
  if (password.length < 8) {
    errors.push('Please enter a password with a minimum length of 8 characters.')
  }
  // Capital letter validator
  const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const chars = password.split('')
  let capsCount = 0
  let numCount = 0
  chars.forEach((chr) => {
    if (caps.includes(chr)) { capsCount++ }
    if (parseInt(chr)) { numCount++ }
  })
  if (capsCount === 0) {
    errors.push('Your password must contain at least one capital letter.')
  }
  if (numCount === 0) {
    errors.push('Your password must contain at least one number.')
  }

  if (errors.length === 0) {
    return { valid: true, errors: errors }
  }
  else {
    return { valid: false, errors: errors }
  }
}

export function userNameValidator(name) {
  // store errors in an array to be shown to user
  let errors = []
  // check length of name
  const len = name.length
  if (len < 6) {
    errors.push("Your username must have a length of at least 6 characters.")
  }
  // -- check if it contains invalid characters including space
  // list of invalid characters
  const invalidChars = '~!@#$%^&*()+=-`|\{}[]:;"?/><,. '.split('')
  const chars = name.split('')
  // count invalid characters found
  let invalidCount = 0
  chars.forEach((chr) => {
    if (invalidChars.includes(chr)) { invalidCount++ }
  })
  if (invalidCount > 0) {
    errors.push(`contains ${invalidCount} invalid ${(invalidCount > 1) ? "characters" : "character"}`)
  }
  // Number characters validator
  if (Number(name)) {
    errors.push("Your username must contain letters.")
  }
  if (Number(name.charAt(0))) {
    errors.push("Your username cannot start with a number.")
  }
  
  if (errors.length === 0) {
    return { valid: true, errors: errors }
  }
  else {
    return { valid: false, errors: errors }
  }
}