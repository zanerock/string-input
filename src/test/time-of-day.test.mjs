import { TimeOfDay } from '../time-of-day'

describe('TimeOfDay', () => {
  test.each(['2400', '24:00', '24:00:00'])('Recognizes %s as special end of day.', (input) =>
    expect(TimeOfDay(input).isEOD()).toBe(true))

  test('Rejects EOD if disallowed',
    () => expect(() => TimeOfDay('2400', { noEOD : true })).toThrow(/disallowed special/))

  test.each([
    ['2105', 21, 5, 0, 0],
    ['21:10', 21, 10, 0, 0],
    ['21:10:30', 21, 10, 30, 0],
    ['21:10:30.509', 21, 10, 30, 0.509],
    ['08:10', 8, 10, 0, 0],
    ['9:10 PM', 21, 10, 0, 0],
    ['09:10:30 PM', 21, 10, 30, 0],
    ['9:10:30.509 PM', 21, 10, 30, 0.509],
    ['9:10 AM', 9, 10, 0, 0],
    ['12:30 PM', 0, 30, 0, 0]
  ])('%s => hours: %s, minutes: %s, seconds: %s, frac seconds: %s', (input, hours, mins, secs, fracSecs) => {
    const time = TimeOfDay(input)
    expect(time.getHours()).toBe(hours)
    expect(time.getMinutes()).toBe(mins)
    expect(time.getSeconds()).toBe(secs)
    expect(time.getFractionalSeconds()).toBe(fracSecs)
  })

  test('Accepts name designation as input',
    () => expect(() => TimeOfDay(undefined, { name : 'foo' })).toThrow(/Time of day 'foo'/))

  test("Looks for name on 'this' context", () => {
    const obj = { name : 'foo', type : TimeOfDay }
    expect(() => obj.type(undefined)).toThrow(/Time of day 'foo'/)
  })

  test("Explicit name overrides 'this' context", () => {
    const obj = { name : 'foo', type : TimeOfDay }
    expect(() => obj.type(undefined, { name : 'bar' })).toThrow(/Time of day 'bar'/)
  })

  test('Raises an error on undefined input', () => expect(() => TimeOfDay(undefined)).toThrow(/is null or undefined/))

  test('Raises an error on null input', () => expect(() => TimeOfDay(null)).toThrow(/is null or undefined/))

  test('Raises an error on non-string input', () => expect(() => TimeOfDay(12)).toThrow(/must be a string/))

  test('Raises an error on unrecognizable input', () => expect(() => TimeOfDay('foo')).toThrow(/not recognized/))
})
