import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

import { intlDateRE, usDateRE } from 'regex-repo'

const describeSelf = (name) => describeInput('Day', name)

const Day = function (input, name) {
  name = name || this?.name

  typeChecks(input, describeSelf, name)

  const intlMatch = input.match(intlDateRE)
  const usMatch = input.match(usDateRE)

  if (intlMatch !== null && usMatch !== null) {
    throw new Error(`${describeSelf(name)} value '${input}' is ambiguous; cannot determine month, date, or year. Try specifying four digit year (with leading zeros if necessary) to disambiguate US (MM/DD/YYYY) vs international (YYYY/MM/DD) formats.`)
  } else if (intlMatch === null && usMatch === null) {
    throw Error(`${describeSelf(name)} value '${input}' not recognized as either US or international date. Try something like '1/15/2024' or '2024-1-15'.`)
  }

  const ceIndicator = intlMatch?.[1] || usMatch?.[3]
  const year = parseInt((ceIndicator === undefined ? '' : ceIndicator) + (intlMatch?.[2] || usMatch?.[4]))
  const month = parseInt(intlMatch?.[3] || usMatch?.[1])
  const day = parseInt(intlMatch?.[4] || usMatch?.[2])

  const testDate = new Date(year, month - 1, day)
  // The month can't overflow because we only accept valid months, so we just need to check the day of the month
  if (day !== testDate.getDate()) {
    throw new Error(`${describeSelf(name)} input '${input}' looks syntactically valid, but specifies an invalid day for the given month/year.`)
  }

  return {
    getDayOfMonth : () => day,
    getMonth      : () => month,
    getYear       : () => year
  }
}

export { Day }
