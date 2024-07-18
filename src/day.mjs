import { intlDateRE, rfc2822DayREString, usDateRE } from 'regex-repo'

import { checkMaxMin } from './lib/check-max-min'
import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { convertMonthName } from './lib/date-time/convert-month-name'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const Day = function (
  input,
  {
    name = this?.name,
    max = this?.max,
    min = this?.min,
    validateInput = this?.validateInput,
    validateValue = this?.validateValue
  } = {}
) {
  const selfDescription = describeInput('Day', name)
  typeChecks(input, selfDescription)

  const intlMatch = input.match(intlDateRE)
  const usMatch = input.match(usDateRE)
  const rfc2822Match = input.match(new RegExp(`^${rfc2822DayREString}$`))

  const matchCount = (intlMatch !== null ? 1 : 0) +
    (usMatch !== null ? 1 : 0) +
    (rfc2822Match !== null ? 1 : 0)

  if (matchCount > 1) {
    throw new Error(`${selfDescription} value '${input}' is ambiguous; cannot determine month, date, or year. Try specifying four digit year (with leading zeros if necessary) to disambiguate US (MM/DD/YYYY) vs international (YYYY/MM/DD) formats.`)
  } else if (matchCount === 0) {
    throw Error(`${selfDescription} value '${input}' not recognized as either US, international, or RFC 2822 style date. Try something like '1/15/2024', '2024-1-15', or '15 Jan 2024'.`)
  }

  checkValidateInput(input, { selfDescription, validateInput })

  const ceIndicator = intlMatch?.[1] || usMatch?.[3] || ''
  const year = parseInt(ceIndicator + (intlMatch?.[2] || usMatch?.[4] || rfc2822Match?.[4]))
  let month
  if (rfc2822Match !== null) {
    month = convertMonthName(rfc2822Match[3])
  } else {
    month = parseInt(intlMatch?.[3] || usMatch?.[1])
  }
  const day = parseInt(intlMatch?.[4] || usMatch?.[2] || rfc2822Match?.[2])

  const date = new Date(year, month - 1, day)

  if (typeof max === 'string') {
    max = Day(max, { name : `${name}' constraint 'max` }).getDate()
  } else if (typeof max === 'number') {
    max = new Date(max)
  } else if (max instanceof Day) {
    max = max.getDate()
  } else if (max !== undefined && !(max instanceof Date)) {
    throw new Error(`${selfDescription} constraint 'max' has nonconvertible type. Use 'string', 'number', 'Date', or 'Day'.`)
  }
  if (typeof min === 'string') {
    min = Day(min, { name : `${name}' constraint 'min` }).getDate()
  } else if (typeof min === 'number') {
    min = new Date(min)
  } else if (min instanceof Day) {
    min = min.getDate()
  } else if (min !== undefined && !(min instanceof Date)) {
    throw new Error(`${selfDescription} constraint 'min' has nonconvertible type. Use 'string', 'number', 'Date', or 'Day'.`)
  }
  checkMaxMin({
    input,
    limitToString : (limit) => `${limit.getUTCFullYear()}/${('' + (limit.getUTCMonth() + 1)).padStart(2, '0')}/${('' + limit.getDate()).padStart(2, '0')}`,
    max,
    min,
    selfDescription,
    value         : date
  })

  checkValidateValue(date, { input, selfDescription, validateValue })

  // The month can't overflow because we only accept valid months, so we just need to check the day of the month
  if (day !== date.getDate()) {
    throw new Error(`${selfDescription} input '${input}' looks syntactically valid, but specifies an invalid day for the given month/year.`)
  }

  return {
    getDayOfMonth : () => day,
    getMonth      : () => month,
    getYear       : () => year,
    getDate       : () => date
  }
}

export { Day }
