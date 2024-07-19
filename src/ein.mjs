import { einRE } from 'regex-repo'

import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const EIN = function (
  input,
  { name = this?.name, validateInput = this?.validateInput, validateValue = this?.validateValue } = {}
) {
  const selfDescription = describeInput('EIN', name)
  typeChecks(input)

  const einMatch = input.match(einRE)
  if (einMatch === null) {
    throw Error(`${selfDescription} input '${input}' is not a valid EIN. Ensure there are nine digits and a valid area code.`)
  }
  checkValidateInput(input, { selfDescription, validateInput })
  const value = input.slice(0, 2) + '-' + input.slice(-7)
  checkValidateValue(value, { input, selfDescription, validateValue })

  return value
}

export { EIN }
