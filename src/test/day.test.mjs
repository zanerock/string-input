import { Day } from '../day'

describe('Day', () => {
  test.each([
    ['2024-01-02', 2024, 1, 2],
    ['2024-1-2', 2024, 1, 2],
    ['01-02-2024', 2024, 1, 2],
    ['1-2-2024', 2024, 1, 2],
    ['01/02/-2024', -2024, 1, 2],
    ['-2024.01.02', -2024, 1, 2]
  ])('%s => year: %p, month: %p, day of month: %p', (input, year, month, dayOfMonth) => {
    const day = Day(input)
    expect(day.getYear()).toBe(year)
    expect(day.getMonth()).toBe(month)
    expect(day.getDayOfMonth()).toBe(dayOfMonth)
  })

  test('Accepts name designation as input', () => expect(() => Day(undefined, { name : 'foo' })).toThrow(/Day 'foo'/))

  test("Looks for name on 'this' context", () => {
    const obj = { name : 'foo', type : Day }
    expect(() => obj.type(undefined)).toThrow(/Day 'foo'/)
  })

  test("Explicit name overrides 'this' context", () => {
    const obj = { name : 'foo', type : Day }
    expect(() => obj.type(undefined, { name : 'bar' })).toThrow(/Day 'bar'/)
  })

  test('Raises an error on undefined input', () => expect(() => Day(undefined)).toThrow(/is null or undefined/))

  test('Raises an error on null input', () => expect(() => Day(null)).toThrow(/is null or undefined/))

  test('Raises an error on non-string input', () => expect(() => Day(12)).toThrow(/must be a string/))

  test('Raises an error on ambiguous input', () => expect(() => Day('01.01.01')).toThrow(/ambiguous/))

  test('Raises an error on unrecognizable input', () => expect(() => Day('foo')).toThrow(/not recognized/))

  test('Raises an error on date overflow', () => expect(() => Day('2024-02-30')).toThrow(/invalid day/))
})
