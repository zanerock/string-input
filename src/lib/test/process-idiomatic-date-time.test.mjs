import { processIdiomaticDateTime } from '../process-idiomatic-date-time'

describe('processIdiomaticDateTime', () => {
  test.each([
    ['01/02/2024 12:30', '+0100', [2024, 1, 2, false, 12, 30, 0, 0, 60]]
  ])('%s (tz: %s) => %p', (input, tz, result) => 
    expect(processIdiomaticDateTime('Test input', input, tz)).toEqual(result))
})