import { TimeOfDay } from '../time-of-day'

describe('TimeOfDay', () => {
  const validInput = [ // too keep from repeating 'false' for each of these, we test EOD special later
    ['2105', undefined, 21, 5, 0, 0],
    ['21:10', undefined, 21, 10, 0, 0],
    ['21:10:30', undefined, 21, 10, 30, 0],
    ['21:10:30.509', undefined, 21, 10, 30, 0.509],
    ['08:10', undefined, 8, 10, 0, 0],
    ['9:10 PM', undefined, 21, 10, 0, 0],
    ['09:10:30 PM', undefined, 21, 10, 30, 0],
    ['9:10:30.509 PM', undefined, 21, 10, 30, 0.509],
    ['9:10 AM', undefined, 9, 10, 0, 0],
    ['12:30 PM', undefined, 0, 30, 0, 0],
    ['12:00', { max : '12:01' }, 12, 0, 0, 0],
    ['12:00', { max : '12:00' }, 12, 0, 0, 0],
    ['12:00', { min : '11:59' }, 12, 0, 0, 0],
    ['12:00', { min : '12:00' }, 12, 0, 0, 0],
    ['12:00', { validateInput : (input) => /:/.test(input) }, 12, 0, 0, 0],
    ['12:00', { validateValue : (value) => value.getSeconds() === 0 }, 12, 0, 0, 0]
  ]

  const invalidInput = [
    [undefined, {}, 'is null or undefined'],
    [null, {}, 'is null or undefined'],
    [12, {}, 'must be a string'],
    ['foo', {}, 'not recognized'],
    ['2400', { noEOD : true }, 'disallowed special'],
    ['12:00', { max : '11:59' }, "must be less than or equal to '11:59:00'"],
    ['12:00', { min : '12:01' }, "must be greater than or equal to '12:01:00"],
    ['12:00', { max : 'foo' }, "constraint 'max'.*?not recognized"],
    ['12:00', { min : 'foo' }, "constraint 'min'.*?not recognized"],
    ['1200', { validateInput : (input) => /:/.test(input) }, 'failed custom input validation'],
    ['12:00', { validateValue : (value) => value.getSeconds() !== 0 }, 'failed custom value validation']
  ].map((params) => { params[1].name = 'foo'; params[2] = "Time of day 'foo'.*?" + params[2]; return params })

  test.each(validInput)('%s, options %p => hours: %s, minutes: %s, seconds: %s, frac seconds: %s',
    (input, options, hours, mins, secs, fracSecs) => {
      const time = TimeOfDay(input, options)
      expect(time.getHours()).toBe(hours)
      expect(time.getMinutes()).toBe(mins)
      expect(time.getSeconds()).toBe(secs)
      expect(time.getFractionalSeconds()).toBe(fracSecs)
      expect(time.isEOD()).toBe(false)
    }
  )

  test.each(invalidInput)('%s, options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => TimeOfDay(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(['2400', '24:00', '24:00:00'])('Recognizes %s as special end of day.', (input) =>
    expect(TimeOfDay(input).isEOD()).toBe(true))

  test("Explicit name overrides 'this' context", () => {
    const obj = { name : 'foo', type : TimeOfDay }
    expect(() => obj.type(undefined, { name : 'bar' })).toThrow(/Time of day 'bar'/)
  })
})
