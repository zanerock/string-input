import { getTimezoneOffset } from './get-timezone-offset'

const processRFC2822DateTime = (selfDescription, rfc2822Match, localTimezone) => {
  const year = rfc2822Match[4]
  const month = rfc2822Match[3]
  const day = rfc2822Match[2]
  const hours = rfc2822Match[5]
  const minutes = rfc2822Match[6]
  const seconds = rfc2822Match[7]
  const timezone = rfc2822Match[8]

  const timezoneOffset = 
    getTimezoneOffset(selfDescription, [year, month, day, hours, minutes, seconds, fracSeconds, timezone])

  return [year, month, day, /*isEOD*/ false, hours, minutes, seconds, fracSeconds, timezoneOffset]
}

export { processRFC2822DateTime }