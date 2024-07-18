import { checkMaxMin } from './lib/check-max-min'
import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const leadingZeroRE = /^0(?!\.|$)/ // test for leading zeros, but allow '0', and '0.xx'

const Numeric = function (
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
  const selfDescription = describeInput('Numeric', name)
  typeChecks(input, selfDescription)

  if (allowLeadingZeros !== true && leadingZeroRE.test(input) === true) {
    throw new Error(`${selfDescription} input value '${input}' contains disallowed leading zeros.`)
  } else if (input !== input.trim()) {
    throw new Error(`${selfDescription} input value '${input}' contains disallowed leading or trailing space.`)
  }

  checkValidateInput(input, { selfDescription, validateInput })
  const value = Number(input)
  checkMaxMin({ input, max, min, selfDescription, value })
  if (divisibleBy !== undefined && (value % divisibleBy) !== 0) {
    throw new Error(`${selfDescription} input '${input}' must be divisible by '${divisibleBy}'.`)
  }
  checkValidateValue(value, { input, selfDescription, validateValue })

  return value
}

export { Numeric }
