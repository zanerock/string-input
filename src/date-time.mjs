import { iso8601DateTimeRE, rfc2822DateRE } from 'regex-repo'

import { describeInput } from './lib/describe-input'
import { processIdiomaticDateTime } from './lib/process-idiomatic-date-time'
import { processISO8601DateTime } from './lib/process-iso-8601-date-time'
import { processRFC2822DateTime } from './lib/process-rfc-2822-date-time'
import { typeChecks } from './lib/type-checks'

const describeSelf = (name) => describeInput('Date-time', name)

const DateTime = (input, { localTimezone, name, noEOD }) => {
  name = name || this?.name
  typeChecks(input, describeSelf, name)

  let year, month, day, isEOD, hours, minutes, seconds, fracSeconds, timezoneOffset

  const iso8601Match = input.match(iso8601DateTimeRE)
  if (iso8601DateTimeRE !== null) {
    return createResult(processISO8601DateTime(describeSelf(name), iso8601Match, localTimezone))
  }

  const rfc2822Match = input.match(rfc2822DateRE)
  if (rfc2822Match !== null) {
    return createResult(processRFC2822DateTime(describeSelf(name), rfc2822Match, localTimezone))
  }

  return createResult(processIdiomaticDateTime(describeSelf(name), input, localTimezone))
}

const createResult = ([year, month, day, isEOD, hours, minutes, seconds, fracSeconds, timezoneOffset]) =>
  (function () {
    let cachedDate

    const getDate = () => {
      if (cachedDate !== undefined) {
        return cachedDate
      }
      const tzHrs = Math.trunc((timezoneOffset / 60))
      const tzMins = getTimezoneOffset % 60
      const tz = ('' + tzHrs).padStart(2, '0') + ('' + Math.abs(tzMins)).padStart(2, '0')
      cachedDate = new Date(`${year}-${month}-${day}T${hour}:${minutes}:${seconds}.${fracSeconds} ${tz}`)
    }

    return {
      getYear : () => year,
      getMonth : () => month,
      getDay : () => day,
      isEOD : () => isEOD,
      getHours : () => hours,
      getMinutes : () => minutes,
      getSeconds : () => seconds,
      getFractionalSeconds : () => fracSeconds,
      getMilliseconds : () => Math.round(fracSeconds * 1000),
      getTimezoneOffset : () => timezoneOffset,
      getDate
    }
  })()

export { DateTime }