import { intlDateRE, rfc2822DayREString, usDateRE } from 'regex-repo'

import { convertMonthName } from './lib/date-time/convert-month-name'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

const Day = function (input, { name, after, before, validateInput, validateValue } = {}) {
  after = after || this?.after
  before = before || this?.before
  name = name || this?.name
  validateValue = validateValue || this?.validateValue
  validateInput = validateInput || this?.validateInput

  const selfDescription = describeInput('Day', name)
  typeChecks(input, selfDescription)

  const intlMatch = input.match(intlDateRE)
  const usMatch = input.match(usDateRE)
  const rfc2822Match = input.match(new RegExp(`^${rfc2822DayREString}$`))

  const matchCount = (intlMatch !== null ? 1 : 0) +
    (usMatch !== null ? 1 : 0) +
    (rfc2822Match !== null ? 1 : 0)

  if (matchCount > 1) {
    throw new Error(`selfDescription value '${input}' is ambiguous; cannot determine month, date, or year. Try specifying four digit year (with leading zeros if necessary) to disambiguate US (MM/DD/YYYY) vs international (YYYY/MM/DD) formats.`)
  } else if (matchCount === 0) {
    throw Error(`selfDescription value '${input}' not recognized as either US, international, or RFC 2822 style date. Try something like '1/15/2024', '2024-1-15', or '15 Jan 2024'.`)
  }

  const ceIndicator = intlMatch?.[1] || usMatch?.[3] || ''
  const year = parseInt(ceIndicator + (intlMatch?.[2] || usMatch?.[4] || rfc2822Match?.[4]))
  let month
  if (rfc2822Match !== null) {
    month = convertMonthName(rfc2822Match[3])
  } else {
    month = parseInt(intlMatch?.[3] || usMatch?.[1])
  }
  const day = parseInt(intlMatch?.[4] || usMatch?.[2] || rfc2822Match?.[2])

  const testDate = new Date(year, month - 1, day)
  // The month can't overflow because we only accept valid months, so we just need to check the day of the month
  if (day !== testDate.getDate()) {
    throw new Error(`selfDescription input '${input}' looks syntactically valid, but specifies an invalid day for the given month/year.`)
  }

  return {
    getDayOfMonth : () => day,
    getMonth      : () => month,
    getYear       : () => year
  }
}

export { Day }
