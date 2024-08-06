import { validateHelper } from './validate-helper'

const checkValidateValue = (value, options = {}) => {
  validateHelper({
    type           : 'value',
    validationFunc : options.validateValue,
    validationArgs : [value, options]
  })
}

export { checkValidateValue }
