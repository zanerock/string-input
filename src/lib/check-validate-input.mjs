import { validateHelper } from './validate-helper'

const checkValidateInput = (input, options = {}) => {
  validateHelper({
    type           : 'input',
    validationFunc : options.validateInput,
    validationArgs : [input, options]
  })
}

export { checkValidateInput }
