const checkValidateInput = (input, { selfDescription, validateInput } = {}) => {
  if (validateInput === undefined) return

  const result = validateInput(input, { selfDescription })
  // if 'validateInput' doesn't throw
  if (result === false) {
    throw new Error(`${selfDescription} input '${input}' failed custom input validation.`)
  }
}

export { checkValidateInput }
