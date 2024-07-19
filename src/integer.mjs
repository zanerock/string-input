import { integerRE } from 'regex-repo'

import { checkMaxMin } from './lib/check-max-min'
import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const anyDigitsRE = /^-?\d+$/

const Integer = function (
  input,
  {
    name = this?.name,
    allowLeadingZeros = this?.allowLeadingZeros,
    divisibleBy = this?.divisibleBy,
    max = this?.max,
    min = this?.min,
    validateInput = this?.validateInput,
    validateValue = this?.validateValue
  } = {}
) {
  const selfDescription = describeInput('Integer', name)
  typeChecks(input, selfDescription)

  if (allowLeadingZeros !== true && input.match(integerRE) === null) {
    let msg = `${selfDescription} input value '${input}' does not appear to be an integer.`
    if (input.match(anyDigitsRE)) {
      msg += ' Leading zeros are not allowed.'
    }
    throw new Error(msg)
  } else if (allowLeadingZeros === true && input.match(anyDigitsRE) === null) {
    const msg = `${selfDescription} input value '${input}' does not appear to be an integer (leading zeros allowed).`
    throw new Error(msg)
  }

  checkValidateInput(input, { selfDescription, validateInput })
  const value = parseInt(input)
  checkMaxMin({ input, max, min, selfDescription, value })
  if (divisibleBy !== undefined && (value % divisibleBy) !== 0) {
    throw new Error(`${selfDescription} input '${input}' must be divisible by '${divisibleBy}'.`)
  }
  checkValidateValue(value, { input, selfDescription, validateValue })

  return value
}

export { Integer }
