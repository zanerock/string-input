import { CardNumber } from '../card-number'

describe('CardNumber', () => {
  const validInput = [
    ['378282246310005', undefined],
    ['3782-822463-10005', undefined],
    ['3782 822463 10005', undefined],
    ['5610591081018250', undefined],
    ['3566002020360505', undefined],
    ['5019717010103742', { iins : ['50'] }],
    ['5019717010103742', { iins : [50] }],
    ['5019717010103742', { iins : [/^50/] }],
    ['5019717010103742', { iins : ['490-501'] }],
    ['0123456789999', { iins : ['012-200'] }],
    ['0123-4567-89999', { validateInput : (input) => input.startsWith('0') }],
    ['0123-4567-89999', { validateValue : (value) => /-/.test(value) === false }]
  ]

  const failureInput = [
    [null, {}, 'is null or undefined'],
    [undefined, {}, 'is null or undefined'],
    ['abc', {}, "doesn't appear to be a card number"],
    ['123', {}, 'must be.*?digits long'],
    ['12345678901234567890', {}, 'must be.*?digits long'],
    ['5019717010103742', { iins : [/50/] }, 'not pinned to to the start'],
    ['5019717010103742', { iins : ['50-600'] }, 'specify the same number of digits'],
    ['5019717010103742', { iins : ['500-600-700'] }, 'invalid range'],
    ['5019717010103742', { iins : [/^60/] }, 'invalid IIN'],
    ['5019717010103742', { iins : ['60'] }, 'invalid IIN'],
    ['5019717010103742', { iins : [60] }, 'invalid IIN'],
    ['5019717010103742', { iins : ['60-70'] }, 'invalid IIN'],
    ['5019717010103741', {}, 'typo somewhere'],
    ['0123456789999', { validateInput : (input) => input.startsWith('1') }, 'failed custom input validation'],
    ['012345678-9999', { validateValue : (value) => value.startsWith('1') }, 'failed custom value validation']
  ].map((params) => { params[1].name = 'foo'; params[2] = "Card number 'foo'.*?" + params[2]; return params })

  test.each(validInput)('validates number %s with options %p', (acctNumber, options) => {
    const expected = acctNumber.replaceAll(/[ -]/g, '')
    expect(CardNumber(acctNumber, options)).toBe(expected)
  })

  test.each(failureInput)('%s and options %p throws error matching %s', (input, options, errorMatch) =>
    expect(() => CardNumber(input, options)).toThrow(new RegExp(errorMatch)))

  test.each(failureInput)('%s and context %p throws error matching %s', (input, context, errorMatch) => {
    context.type = CardNumber
    expect(() => context.type(input)).toThrow(new RegExp(errorMatch))
  })
})
