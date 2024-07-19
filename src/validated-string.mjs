import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const ValidatedString = function (
  input,
  {
    after = this?.after,
    before = this?.before,
    endsWith = this?.endsWith,
    matchRE = this?.matchRE,
    maxLength = this?.maxLength,
    minLength = this?.minLength,
    name = this?.name,
    oneOf = this?.oneOf,
    startsWith = this?.startsWith,
    validateInput = this?.validateInput,
    validateValue = this?.validateValue
  } = {}
) {
  const selfDescription = describeInput('String', name)
  typeChecks(input)

  if (after !== undefined && [after, input].sort()[0] !== after) {
    throw new Error(`${selfDescription} input '${input}' must be lexicographically after '${after}'.`)
  }
  if (before !== undefined && [input, before].sort()[1] !== before) {
    throw new Error(`${selfDescription} input '${input}' must be lexicographically before '${before}'.`)
  }

  if (endsWith !== undefined && !input.endsWith(endsWith)) {
    throw new Error(`${selfDescription} input '${input}' must end with '${endsWith}'.`)
  }
  if (startsWith !== undefined && !input.startsWith(startsWith)) {
    throw new Error(`${selfDescription} input '${input}' must start with '${startsWith}'.`)
  }

  if (matchRE !== undefined) {
    if (typeof matchRE === 'string') {
      matchRE = new RegExp(matchRE)
    }
    if (matchRE.test(input) !== true) {
      throw new Error(`${selfDescription} input '${input}' must match ${matchRE.toString()}.`)
    }
  }

  if (maxLength !== undefined && input.length > maxLength) {
    throw new Error(`${selfDescription} input '${input}' must have length ${maxLength} or less.`)
  }
  if (minLength !== undefined && input.length < minLength) {
    throw new Error(`${selfDescription} input '${input}' must have length ${minLength} or greater.`)
  }

  if (oneOf !== undefined && !oneOf.includes(input)) {
    throw new Error(`${selfDescription} input '${input}' must be one of '${oneOf.join("', '")}'.`)
  }

  checkValidateInput(input, { selfDescription, validateInput })
  checkValidateValue(input, { input, selfDescription, validateValue })

  return input
}

export { ValidatedString }
