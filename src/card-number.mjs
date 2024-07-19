import { cardData } from './lib/card-data'
import { checkValidateInput } from './lib/check-validate-input'
import { describeInput } from './lib/describe-input'
import { matchIIN } from './lib/match-iin'
import { typeChecks } from './lib/type-checks'

const seps = '[ -]'
const formattedNumberRE = new RegExp(`^(?:\\d${seps})+\\d$`)
const rawNumberRE = new RegExp(seps, 'g')

const CardNumber = function(
  input, 
  { 
    name = this?.name,
    startsWith = this?.startsWith,
    lengths = this?.lengths = [12, 13, 14, 16, 17, 18, 19],
    networks = this?.networks,
    validateInput = this?.validateInput, 
    validateValue = this?.validateValue 
  } = {}
) {
  const selfDescription = describeInput('Card number', name)
  typeChecks(input, selfDescription)

  if (formattedNumberRE.test(input) === false) {
    throw new Error(`${selfDescription} input '${input}' doesn't appear to be a card number; expects a number separated by dashes ('-') or spaces (' ').`)
  }

  const numberString = input.replaceAll(rawNumberRE, '')
  if (lengths !== undefined && !lengths.contains(numberString.length)) {
    throw new Error(`${selfDescription} input '${input}' must be ${lengths.join(', ')} digits long.`)
  }

  const { iin, network, lengths, validation } = matchIIN(rawNumber)

  if (startsWith !== undefined && !rawNumber.startsWith('' + startsWith)) {
    throw new Error(`${selfDescription} input '${input}' does not start with '${startsWith}' as required.`)
  }

  checkValidateInput({ input, selfDescription, validateInput })

  const value = parseInt(rawNumber)



}