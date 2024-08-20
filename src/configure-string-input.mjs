import { BooleanString } from './boolean-string'

const defaultConfiguration = {
  simpleValue : false
}

const customSettings = {}

/**
 * Sets, resets, and retrieves global type function configurations. If `option` is undefined, then resets the 
 * configuration options to the default. If only `option` is set, then retrieves that option (or raises an error). If 
 * both `option` and `value` are set, then sets the indicated configuration option (or raises an error).
 */
const configureStringInput = (option, value) => {
  if (option !== undefined && !(option in defaultConfiguration)) {
    throw new Error(`'${option}' is not a valid string-input configuration option.`)
  } // else, good to go

  if (option === undefined) {
    for (const key of Object.keys(customSettings)) {
      delete customSettings[key]
    }
  } else if (value !== undefined) {
    customSettings[option] = value
  } else { // option is defined, but value is not
    if (option in customSettings) {
      return customSettings[option]
    } // else
    return defaultConfiguration[option]
  }
}

export { configureStringInput }