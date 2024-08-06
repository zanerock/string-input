import { getLatestTLDs, validateEmail } from 'true-email-validator'

import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'


const Email = function (input, options = this || {}) {
  const { name } = options

  const selfDescription = describeInput('Email', name)

  typeChecks(input, selfDescription)

  if (options.validateValue !== undefined) {
    options.validateResult = options.validateValue
  }

  const result = validateEmail(input, options)
  const { issues, isValid } = result
  delete result.issues
  delete result.isValid

  if (isValid === false) {
    if (issues.length === 0) { // shouldn't happen, but just in case
      issues.push('has unspecified issues')
    }
    throw new Error(`${selfDescription} input '${input}' ${issues.join(', ')}.`)
  }

  return result
}

export { Email, getLatestTLDs }
