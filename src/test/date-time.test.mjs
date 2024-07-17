import { DateTime } from '../date-time'

describe('DateTime', () => {
  test.each([
    ['2024-01-02T12:30:40.50Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0.5, 0]],
    ['2 Jan 2024 12:30:40 Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0, 0]],
    ['1/2/2024 12:30:40.5 +0100', undefined, [2024, 1, 2, false, 12, 30, 40, 0.5, 60]]
  ])('%s (options: %p) => %p', (input, options, expected) => {
    const result = DateTime(input, options)
    expect(result.getYear()).toBe(expected[0])
    expect(result.getMonth()).toBe(expected[1])
    expect(result.getDayOfMonth()).toBe(expected[2])
    expect(result.isEOD()).toBe(expected[3])
    expect(result.getHours()).toBe(expected[4])
    expect(result.getMinutes()).toBe(expected[5])
    expect(result.getSeconds()).toBe(expected[6])
    expect(result.getFractionalSeconds()).toBe(expected[7])
    expect(result.getMilliseconds()).toBe(expected[7] * 1000)
    expect(result.getTimezoneOffset()).toBe(expected[8])
  })

  test('Can generate a JS Date', () => {
    const dateTime = DateTime('2024-01-02 12:30:40.50 Z')
    const date = dateTime.getDate()
    expect(date.getUTCFullYear()).toBe(2024)
    expect(date.getUTCMonth()).toBe(0) // Date months are 0-indexed
    expect(date.getUTCDate()).toBe(2)
    expect(date.getUTCHours()).toBe(12)
    expect(date.getUTCMinutes()).toBe(30)
    expect(date.getUTCSeconds()).toBe(40)
    expect(date.getUTCMilliseconds()).toBe(500)
  })

  test('Caches the date', () => {
    const dateTime = DateTime('2024-01-02 12:30:40.50 Z')
    const date1 = dateTime.getDate()
    const date2 = dateTime.getDate()
    expect(date1).toBe(date2)
  })
})
