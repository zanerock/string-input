const validateHelper = ({ type, validationFunc, validationArgs }) => {
  if (validationFunc === undefined) return

  const result = validationFunc(...validationArgs)
  const { selfDescription, input } = validationArgs[1]
  if (typeof result === 'string') {
    throw new Error(`${selfDescription} input '${input}' ${result}`)
  } else if (result !== true) {
    throw new Error(`${selfDescription} input '${input}' failed custom ${type} validation.`)
  }
}

export { validateHelper }
