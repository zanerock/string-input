const checkValidateValue = (value, { input, selfDescription, validateValue } = {}) => {
  if (validateValue === undefined) return

  const result = validateValue(value, { input, selfDescription })
  // if 'validateValue' doesn't throw
  if (result === false) {
    throw new Error(`${selfDescription} input '${input}' failed custom value validation.`)
  }
}

export { checkValidateValue }
