import { iso8601DateTimeRE, rfc2822DateRE } from 'regex-repo'

import { checkMaxMin } from './lib/check-max-min'
import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { convertTimezoneOffsetToString } from './lib/date-time/convert-timezone-offset-to-string'
import { describeInput } from './lib/describe-input'
import { makeDateTimeString } from './lib/date-time/make-date-time-string'
import { processIdiomaticDateTime } from './lib/date-time/process-idiomatic-date-time'
import { processISO8601DateTime } from './lib/date-time/process-iso-8601-date-time'
import { processRFC2822DateTime } from './lib/date-time/process-rfc-2822-date-time'
import { typeChecks } from './lib/type-checks'

const DateTime = function (
  input,
  {
    name = this?.name,
    localTimezone = this?.localTimezone,
    max = this?.max,
    min = this?.min,
    noEOD = this?.noEOD,
    validateInput = this?.validateInput,
    validateValue = this?.validateValue
  } = {}) {
  const selfDescription = describeInput('Date-time', name)
  typeChecks(input, selfDescription)

  let value

  const iso8601Match = input.match(iso8601DateTimeRE)
  if (iso8601Match !== null) {
    value = createValue(processISO8601DateTime(selfDescription, iso8601Match, localTimezone))
  }

  const rfc2822Match = input.match(rfc2822DateRE)
  if (rfc2822Match !== null) {
    value = createValue(processRFC2822DateTime(selfDescription, rfc2822Match, localTimezone))
  }

  if (value === undefined) {
    value = createValue(processIdiomaticDateTime(selfDescription, input, localTimezone))
  }

  if (noEOD === true && value.isEOD() === true) {
    throw new Error(`${selfDescription} does not allow special EOD time '24:00'.`)
  }

  checkValidateInput(input, { selfDescription, validateInput })

  if (typeof max === 'string') {
    max = DateTime(max, { name : `${name}' constraint 'max` })
  }
  if (typeof min === 'string') {
    min = DateTime(min, { name : `${name}' constraint 'min` })
  }
  checkMaxMin({ input, limitToString, max, min, selfDescription, value })

  checkValidateValue(value, { input, selfDescription, validateValue })

  return value
}

const limitToString = (limit) => {
  const year = limit.getYear()
  const month = limit.getMonth()
  const day = limit.getDayOfMonth()
  const hours = limit.getHours()
  const minutes = limit.getMinutes()
  const seconds = limit.getSeconds()
  const fracSeconds = limit.getFractionalSeconds()
  const tz = convertTimezoneOffsetToString(limit.getTimezoneOffset())

  return `${year}/${('' + month).padStart(2, '0')}/${('' + day).padStart(2, '0')} ${hours}:${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}${('' + fracSeconds).slice(1)} ${tz}`
}

const createValue = ([year, month, day, isEOD, hours, minutes, seconds, fracSeconds, timezoneOffset]) => {
  const tz = convertTimezoneOffsetToString(timezoneOffset)
  const dateString = makeDateTimeString([year, month, day, hours, minutes, seconds, fracSeconds, tz])
  const date = new Date(dateString)

  return {
    getYear              : () => year,
    getMonth             : () => month,
    getDayOfMonth        : () => day,
    isEOD                : () => isEOD,
    getHours             : () => hours,
    getMinutes           : () => minutes,
    getSeconds           : () => seconds,
    getFractionalSeconds : () => fracSeconds,
    getMilliseconds      : () => Math.round(fracSeconds * 1000),
    getTimezoneOffset    : () => timezoneOffset,
    getDate              : () => date,
    // can't use 'date' for 'valueOf', because in a comparison, it doesn't recursively call 'valueOf()', so the date to
    // date comparison fails
    valueOf              : () => date.getTime()
  }
}

export { DateTime }
