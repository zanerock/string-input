import { DateTime } from '../date-time'

describe('DateTime', () => {
  test.each([
    ['2024-01-02T12:30:40.50Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0.5, 0]]
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
    expect(result.getTimezoneOffset()).toBe(expected[8])
  })
})