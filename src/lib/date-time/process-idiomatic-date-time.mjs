import {
  intlDateREString,
  militaryTimeREString,
  rfc2822DayREString,
  timeREString,
  timezoneREString,
  twentyFourHourTimeREString,
  usDateREString
} from 'regex-repo'

import { convertMonthName } from './convert-month-name'
import { getTimezoneOffset } from './get-timezone-offset'

const processIdiomaticDateTime = (selfDescription, input, localTimezone) => {
  // mil time can easily be confused for the year, so we have to exclude matches to the year
  const milTimeRE = new RegExp(`(?<![a-zA-Z]{3}\\s+|[./+-])${militaryTimeREString}(?![./-])(?:\\s*${timezoneREString}\\b)?`)
  const milTimeMatch = input.match(milTimeRE)
  const timeRE = new RegExp(`${timeREString}(?:\\s*${timezoneREString}\\b)?`)
  const timeMatch = input.match(timeRE)
  const twentyFourHourTimeRE = new RegExp(`${twentyFourHourTimeREString}(?:\\s*${timezoneREString}\\b)?`)
  const twentyFourHourTimeMatch = input.match(twentyFourHourTimeRE)

  const timeMatches = (milTimeMatch !== null ? 1 : 0) +
    (timeMatch !== null ? 1 : 0) +
    (twentyFourHourTimeMatch !== null ? 1 : 0)

  if (timeMatches === 0) {
    throw new Error(`Could not find time component in ${selfDescription.toLowerCase()} input '${input}'.`)
  }
  // I don't believe multiple matches is actually possible.

  const rfc2822DayRE = new RegExp(rfc2822DayREString)
  const rfc2822DayMatch = input.match(rfc2822DayRE)
  const usDateRE = new RegExp('\\b' + usDateREString + '\\b')
  const usDateMatch = input.match(usDateRE)
  // can't use '\b' at start because it would match '-' in '-2024/01/01'
  const intlDateRE = new RegExp('(?:^| )' + intlDateREString + '\\b')
  const intlDateMatch = input.match(intlDateRE)

  const dayMatches = (rfc2822DayMatch !== null ? 1 : 0) +
    (usDateMatch !== null ? 1 : 0) +
    (intlDateMatch !== null ? 1 : 0)

  if (dayMatches === 0) {
    throw new Error(`Could not find date component in ${selfDescription.toLowerCase()} input '${input}'.`)
  } else if (dayMatches > 1) {
    throw new Error(`Ambiguous date component in ${selfDescription.toLowerCase()} input '${input}'; try specifying a 4+ digit year (pad with '0' where necessary).`)
  }

  const ceIndicator = usDateMatch?.[3] || intlDateMatch?.[1] || ''
  const year = parseInt(ceIndicator + (rfc2822DayMatch?.[4] || usDateMatch?.[4] || intlDateMatch?.[2]))
  let month
  if (rfc2822DayMatch !== null) {
    const monthName = rfc2822DayMatch[3]
    month = convertMonthName(monthName)
  } else {
    month = parseInt(usDateMatch?.[1] || intlDateMatch?.[3])
  }
  const day = parseInt(rfc2822DayMatch?.[2] || usDateMatch?.[2] || intlDateMatch?.[4])

  const isEOD = milTimeMatch?.[1] !== undefined || twentyFourHourTimeMatch?.[1] !== undefined || false
  let hours, minutes, seconds, fractionalSeconds
  if (isEOD === true) {
    hours = 24
    minutes = 0
    seconds = 0
    fractionalSeconds = 0
  } else {
    hours = parseInt(milTimeMatch?.[2] || timeMatch?.[1] || twentyFourHourTimeMatch?.[2])
    if (timeMatch !== null) {
      hours += timeMatch[5].toLowerCase() === 'am' ? 0 : 12
      if (hours === 24) {
        hours = 0
      }
    }
    minutes = parseInt(milTimeMatch?.[3] || timeMatch?.[2] || twentyFourHourTimeMatch?.[3])
    seconds = parseInt(timeMatch?.[3] || twentyFourHourTimeMatch?.[4] || '0')
    fractionalSeconds = Number('0.' + (timeMatch?.[4] || twentyFourHourTimeMatch?.[5] || '0'))
  }

  const timezone = milTimeMatch?.[4] || timeMatch?.[6] || twentyFourHourTimeMatch?.[6] || localTimezone
  const timezoneOffset =
    getTimezoneOffset(selfDescription, [year, month, day, hours, minutes, seconds, fractionalSeconds, timezone])

  return [year, month, day, isEOD, hours, minutes, seconds, fractionalSeconds, timezoneOffset]
}

export { processIdiomaticDateTime }
