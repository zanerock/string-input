import { DateTime } from '../date-time'

describe('DateTime', () => {
  const validInput = [
    ['2024-01-02T12:30:40.50Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0.5, 0]],
    ['2 Jan 2024 12:30:40 Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0, 0]],
    ['2 Jan 2024 12:30:40.123 Z', undefined, [2024, 1, 2, false, 12, 30, 40, 0.123, 0]],
    ['2 Jan 2024 00:00:00.123 Z', undefined, [2024, 1, 2, false, 0, 0, 0, 0.123, 0]],
    ['1/2/2024 12:30:40.5 +0100', undefined, [2024, 1, 2, false, 12, 30, 40, 0.5, 60]],
    ['1/2/2024 12:30:40.5', { localTimezone : '-0300' }, [2024, 1, 2, false, 12, 30, 40, 0.5, -180]],
    ['1/2/2024 12:30', { max : '1/2/2024 12:31' }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { max : '1/2/2024 12:30' }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { min : '1/2/2024 12:29' }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { min : '1/2/2024 12:30' }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { max : new Date(2024, 0, 2, 12, 30) }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:45', { min : new Date(2024, 0, 2, 12, 45) }, [2024, 1, 2, false, 12, 45, 0, 0, undefined]],
    ['1/2/2024 12:30', { max : new Date(2024, 0, 2, 12, 30).getTime() }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { min : new Date(2024, 0, 2, 12, 30).getTime() }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { max : DateTime('1/2/2024 12:30') }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { min : DateTime('1/2/2024 12:30') }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { validateInput : (input) => /:/.test(input) }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]],
    ['1/2/2024 12:30', { validateValue : (value) => value.getYear() === 2024 }, [2024, 1, 2, false, 12, 30, 0, 0, undefined]]
  ]

  const failureInput = [
    [undefined, {}, 'is null or undefined'],
    [null, {}, 'is null or undefined'],
    [12, {}, 'must be a string'],
    ['1/2/2024 24:00', { noEOD : true }, 'does not allow special EOD time'],
    ['1/2/2024 12:30', { max : '1/2/2024 12:29' }, "must be less than or equal to '2024/01/02 12:29:00"],
    // we have to specify the 'Z' here because when DateTime is created from Date, it's always in Z and we'd have to
    // handle the offset manually here to match it up without pinning both to Z
    ['1/2/2024 12:30 Z', { max : new Date('1/2/2024 12:29 Z') }, "must be less than or equal to '2024/01/02 12:29:00"],
    ['1/2/2024 12:30 Z', { max : DateTime('1/2/2024 12:29 Z') }, "must be less than or equal to '2024/01/02 12:29:00"],
    ['1/2/2024 12:30', { min : '1/2/2024 12:31' }, "must be greater than or equal to '2024/01/02 12:31:00"],
    ['1/2/2024 12:30 Z', { min : new Date('1/2/2024 12:31 Z') }, "must be greater than or equal to '2024/01/02 12:31:00"],
    ['1/2/2024 12:30 Z', { min : DateTime('1/2/2024 12:31 Z') }, "must be greater than or equal to '2024/01/02 12:31:00"],
    ['1/2/2024 12:30', { max : /invalid type/ }, "'max' has nonconvertible type"],
    ['1/2/2024 12:30', { min : /invalid type/ }, "'min' has nonconvertible type"],
    ['1/2/2024 1230', { validateInput : (input) => /:/.test(input) }, 'failed custom input validation'],
    ['1/2/2024 12:30', { validateValue : (value) => value.getYear() === 2023 }, 'failed custom value validation']
  ]
    .map((params) => { params[1].name = 'foo'; params[2] = "Date-time 'foo'.*?" + params[2]; return params })
    .concat([ // the following reference the input name differently
      ['foo', { name : 'foo' }, "Could not find time component in date-time 'foo'"],
      ['1/1/2024', { name : 'foo' }, "Could not find time component in date-time 'foo'"],
      ['2400', { name : 'foo' }, "Could not find date component in date-time 'foo'"],
      ['1/2/2024 12:30', { name : 'foo', max : 'bar' }, "Could not find time component in date-time 'foo' constraint 'max'"],
      ['1/2/2024 12:30', { name : 'foo', min : 'bar' }, "Could not find time component in date-time 'foo' constraint 'min'"]
    ])

  test.each(validInput)('%s (options: %p) => %p', (input, options, expected) => {
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
    if (expected[8] !== undefined) {
      expect(result.getTimezoneOffset()).toBe(expected[8])
    }
  })

  test.each(failureInput)('%s and options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => DateTime(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(failureInput)('%s and context %p throws error matching %s', (input, context, errorMatch) => {
    context.type = DateTime
    expect(() => context.type(input)).toThrow(new RegExp(errorMatch))
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

  test("Will get 'name' from 'this' context if present", () => {
    const context = {
      name : 'foo',
      type : DateTime
    }
    expect(() => context.type('blah')).toThrow(/[Dd]ate-time 'foo'/)
  })

  test('Caches the date', () => {
    const dateTime = DateTime('2024-01-02 12:30:40.50 -0100')
    const date1 = dateTime.getDate()
    const date2 = dateTime.getDate()
    expect(date1).toBe(date2)
  })
})
