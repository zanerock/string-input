import { makeDateTimeString } from './make-date-time-string'

const getTimezoneOffset = (selfDescription, [year, month, day, hours, minutes, seconds, fracSeconds, timezone]) => {
  if (timezone === undefined) {
    return new Date().getTimezoneOffset()
  } else if (timezone === 'z' || timezone === 'Z') {
    return 0
  } else {
    const numericTZMatch = timezone.match(/([+-])(\d{2})(?::?(\d{2}))?/)
    if (numericTZMatch !== null) {
      const offsetDirection = (numericTZMatch[1] === '-' ? -1 : 1)
      const offsetHours = 60 * parseInt(numericTZMatch[2])
      const offsetMinutes = parseInt(numericTZMatch[3])
      return offsetDirection * (offsetHours + offsetMinutes)
    } else { // it's a named TZ
      const partialSpec = makeDateTimeString([year, month, day, hours, minutes, seconds, fracSeconds])
      const tzDate = new Date(`${partialSpec} ${timezone}`)
      if (isNaN(tzDate.getDate())) { // we assume everything but the TZ is good
        throw new Error(`${selfDescription} timezone designation '${timezone}' not recognized as valid timezone. (The recognized timezones are limited to basic US timezone like CST and PDT; otherwise it's best to designate the offset like '+1030' or '-0100'.)`)
      }
      const utcDate = new Date(`${partialSpec} Z`)
      return Math.trunc((utcDate - tzDate) / (1000 * 60))
    }
  }
}

export { getTimezoneOffset }
