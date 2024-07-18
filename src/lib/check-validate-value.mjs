const checkValidateValue = ({ input, selfDescription, validateValue, value }) => {
  if (validateValue === undefined) return

  const result = validateValue({ input, selfDescription, value })
  // if 'validateValue' doesn't throw
  if (result === false) {
    throw new Error(`${selfDescription} input '${input}' failed custom value validation.`)
  }
}

export { checkValidateValue }