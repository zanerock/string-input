import { Email } from '../email'

const validInput = [
  ['foo@bar.com', undefined, 'foo@bar.com'],
  ['foo+bar@baz.com', undefined, 'foo+bar@baz.com'],
  ['Foo@BAR.COM', undefined, 'Foo@bar.com'],
  ['"foo\\@bar"@baz.com', undefined, '"foo\\@bar"@baz.com'],
  ['(comment)foo@bar.com', undefined, '(comment)foo@bar.com'],
  ['foo@(comment)bar.com', undefined, 'foo@(comment)bar.com'],
  ['foo@bar.com', { noPlusEmails : true }, 'foo@bar.com'],
  ['foo@bar.com', { restrictToKnownTLDs : true }, 'foo@bar.com'],
  ['foo@BAR.COM', { validateInput : (input) => input.endsWith('BAR.COM') }, 'foo@bar.com'],
  ['foo@BAR.COM', { validateValue : (value) => value.endsWith('bar.com') }, 'foo@bar.com']
]

const failureInput = [
  ['foo(@bar.com', {}, 'does not appear to be a valid email address'],
  ['foo\\@bar.com', {}, 'does not appear to be a valid email address'],
  ['foo bar@baz.com', {}, 'does not appear to be a valid email address'],
  ['foo.@baz.com', {}, 'does not appear to be a valid email address'],
  ['.foo@baz.com', {}, 'does not appear to be a valid email address'],
  ['f..oo@baz.com', {}, 'does not appear to be a valid email address'],
  ['f@oo@baz.com', {}, 'does not appear to be a valid email address'],
  ['foo+bar@baz.com', { noPlusEmails : true }, "includes disallowed '\\+' in username"],
  ['foo@bar.notavalidtld', { restrictToKnownTLDs : true }, "includes unknown TLD 'notavalidtld'"],
  ['foo@baz.com', { validateInput : (input) => input.startsWith('2') }, 'failed custom input validation'],
  ['foo@baz.com', { validateValue : (value) => value.startsWith('2') }, 'failed custom value validation']
].map((params) => { params[1].name = 'foo'; params[2] = "Email 'foo'.*?" + params[2]; return params })

describe('Email', () => {
  test.each(validInput)('%s with options %p => %s',
    (input, options, expected) => expect(Email(input, options)).toBe(expected))

  test.each(failureInput)('%s and options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => Email(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(failureInput)('%s and context %p throws error matching %s', (input, context, errorMatch) => {
    context.type = Email
    expect(() => context.type(input)).toThrow(new RegExp(errorMatch))
  })
})
