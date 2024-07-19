import { ValidatedString } from '../validated-string'

const validInput = [
  ['foo', undefined],
  ['foo', { after: 'a' }],
  ['foo', { before: 'x' }],
  ['foo', { endsWith: 'oo' }],
  ['foo', { startsWith: 'f' }],
  ['foo', { matchRE: 'foo' }],
  ['foo', { matchRE: /foo/ }],
  ['foo', { maxLength: 4 }],
  ['foo', { maxLength: 3 }],
  ['foo', { minLength: 2 }],
  ['foo', { minLength: 3 }],
  ['foo', { oneOf: ['foo', 'bar'] }],
  ['foo', { validateInput: (input) => input.startsWith('f') }],
  ['foo', { validateValue: (value) => value.startsWith('f') }],
]

const failureInput = [
  ['foo', { after: 'm'}, "lexicographically after 'm'" ],
  ['foo', { before: 'a'}, "lexicographically before 'a'" ],
  ['foo', { endsWith: 'a' }, "must end with 'a'"],
  ['foo', { startsWith: 'a' }, "must start with 'a'"],
  ['foo', { matchRE: 'bar'}, 'must match /bar/'],
  ['foo', { maxLength: 2 }, 'must have length 2 or less'],
  ['foo', { minLength: 4 }, 'must have length 4 or greater'],
  ['foo', { oneOf: ['a', 'b'] }, "must be one of 'a', 'b'"],
  ['foo', { validateInput: (input) => input.startsWith('a') }, 'failed custom input validation'],
  ['foo', { validateValue: (value) => value.startsWith('a') }, 'failed custom value validation']
].map((params) => { params[1].name = 'bar'; params[2] = "String 'bar'.*?" + params[2]; return params })

describe('ValidatedString', () => {
  test.each(validInput)('%s with options %p passes', 
    (input, options) => expect(ValidatedString(input, options)).toBe(input))

  test.each(failureInput)('%s and options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => ValidatedString(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(failureInput)('%s and context %p throws error matching %s', (input, context, errorMatch) => {
    context.type = ValidatedString
    expect(() => context.type(input)).toThrow(new RegExp(errorMatch))
  })
})