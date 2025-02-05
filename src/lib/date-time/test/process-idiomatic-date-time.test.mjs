import { processIdiomaticDateTime } from '../process-idiomatic-date-time'

describe('processIdiomaticDateTime', () => {
  test.each([
    ['01/02/2024 12:30 -0230', undefined, [2024, 1, 2, false, 12, 30, 0, 0, -150]],
    ['01/02/+2024 12:30 -0230', undefined, [2024, 1, 2, false, 12, 30, 0, 0, -150]],
    ['01/02/-2024 12:30 -0230', undefined, [-2024, 1, 2, false, 12, 30, 0, 0, -150]],
    ['01/02/2024 12:30', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2024/01/02 12:30', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2024/01/02 12:30:10.5', '+0100', [2024, 1, 2, false, 12, 30, 10, 0.5, 60]],
    ['+2024/01/02 12:30', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['-2024/01/02 12:30', '+0100', [-2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2 Jan 2024 12:30', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2 Jan 2024 12:30 PM', '+0100', [2024, 1, 2, false, 0, 30, 0, 0, 60]],
    ['2 Jan 2024 12:30 AM', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2 Jan 2024 1230', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]],
    ['2 Jan 2024 2400', '+0100', [2024, 1, 2, true, 24, 0, 0, 0, 60]],
    ['2 Jan 2024 24:00', '+0100', [2024, 1, 2, true, 24, 0, 0, 0, 60]]
  ])('%s (tz: %s) => %p', (input, tz, result) =>
    expect(processIdiomaticDateTime('Test input', input, tz)).toEqual(result))

  test('Raises an error when no time component can be found', () =>
    expect(() => processIdiomaticDateTime('Test input', '01/02/2024')).toThrow(/Could not find time/))

  test('Raises an error when no date component can be found', () =>
    expect(() => processIdiomaticDateTime('Test input', '12:30 PM')).toThrow(/Could not find date component/))

  test('Raises an error when an ambiguous date component is found', () =>
    expect(() => processIdiomaticDateTime('Test input', '1/1/1 12:30 PM')).toThrow(/Ambiguous date component/))
})
