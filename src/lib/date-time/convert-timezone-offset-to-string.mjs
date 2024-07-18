const convertTimezoneOffsetToString = (offset) => {
  const tzHrs = Math.trunc((offset / 60))
  const tzMins = offset % 60
  const tz = (offset >= 0 ? '+' : '-') +
    ('' + tzHrs).padStart(2, '0') +
    ('' + Math.abs(tzMins)).padStart(2, '0')

  return tz
}

export { convertTimezoneOffsetToString }
