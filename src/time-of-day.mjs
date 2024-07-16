import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'

import { militaryTimeRE, timeRE, twentyFourHourTimeRE } from 'regex-repo'

const describeSelf = (name) => describeInput('Time of day', name)

const TimeOfDay = function (input, { name, noEOD } = {}) {
  name = name || this?.name

  typeChecks(input, describeSelf, name)

  const militaryTimeMatch = input.match(militaryTimeRE)
  const timeMatch = input.match(timeRE)
  const twentyFourHourTimeMatch = input.match(twentyFourHourTimeRE)

  if (militaryTimeMatch === null && timeMatch === null && twentyFourHourTimeMatch === null) {
    throw Error(`${describeSelf(name)} value '${input}' not recognized as either military, standard, or 24-hour time. Try something like '2130', 9:30 PM', or '21:30'.`)
  }

  const isEOD = militaryTimeMatch?.[1] !== undefined || twentyFourHourTimeMatch?.[1] !== undefined
  if (noEOD === true) {
    throw new Error(`${describeSelf(name)} indicates disallowed special 'end-of-day' time.`)
  }

  let hours, minutes, seconds, fracSeconds
  if (isEOD === true) {
    hours = 24
    minutes = 0
    seconds = 0
    fracSeconds = 0
  }
  else {
    if (timeMatch !== null) {
      hours = parseInt(timeMatch[1]) + (timeMatch[5].toLowerCase() === 'pm' ? 12 : 0)
    }
    else {
      hours = parseInt(militaryTimeMatch?.[2] || twentyFourHourTimeMatch?.[2])
    }
    minutes = parseInt(timeMatch?.[2] || militaryTimeMatch?.[3] || twentyFourHourTimeMatch?.[3])
    seconds = parseInt(timeMatch?.[3] || twentyFourHourTimeMatch?.[4] || '0')
    const fracSecondsString = timeMatch?.[4] || twentyFourHourTimeMatch?.[5] || '0'
    fracSeconds = Number('0.' + fracSecondsString)
  }

  return {
    isEOD : () => isEOD,
    getHours      : () => hours,
    getMinutes       : () => minutes,
    getSeconds : () => seconds,
    getFractionalSeconds : () => fracSeconds
  }
}

export { TimeOfDay }
