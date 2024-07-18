const typeChecks = (input, selfDescription) => {
  if (input === undefined || input === null) {
    throw new Error(`${selfDescription} value is null or undefined.`)
  }
  if ((typeof input) !== 'string') {
    throw new Error(`${selfDescription} value must be a string.`)
  }
}

export { typeChecks }
