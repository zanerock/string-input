import { SSN } from '../ssn'

const validInput = [
  ['123-45-6789', undefined, '123-45-6789'],
  ['123456789', undefined, '123-45-6789'],
  ['123456789', { validateInput : (input) => /^\d+$/.test(input) }, '123-45-6789'],
  ['123456789', { validateValue : (value) => /-/.test(value) }, '123-45-6789']
]

const failureInput = [
  ['123-45-678', {}, /not a valid SSN/],
  ['123-45-67890', {}, /not a valid SSN/],
  ['000-45-6789', {}, /not a valid SSN/],
  ['666-45-6789', {}, /not a valid SSN/],
  ['900-45-6789', {}, /not a valid SSN/]
]

describe('SSN', () => {
  test.each(validInput)('%s with options %p => %s',
    (input, options, expected) => expect(SSN(input, options)).toBe(expected))

  test.each(failureInput)('%s and options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => SSN(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(failureInput)('%s and context %p throws error matching %s', (input, context, errorMatch) => {
    context.type = SSN
    expect(() => context.type(input)).toThrow(new RegExp(errorMatch))
  })
})