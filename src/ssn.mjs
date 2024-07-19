import { ssnRE } from 'regex-repo'

import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const SSN = function(
  input, 
  { name = this?.name, validateInput = this?.validateInput, validateValue = this?.validateInput } = {}
) {
  const selfDescription = describeInput('SSN', name)
  typeChecks(input)

  const ssnMatch = input.match(ssnRE)
  if (ssnMatch === null) {
    throw Error(`${selfDescription} input '${input}' is not a valid SSN. Ensure there are nine digits and a valid area code.`)
  }
  checkValidateInput({ input, selfDescription, validateInput })
  const value = `${ssnMatch[1]}-${ssnMatch[2]}-${ssnMatch[3]}`
  checkValidateValue({ input, value, selfDescription, validateValue })

  return value
}

export { SSN }