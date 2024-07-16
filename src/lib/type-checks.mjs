const typeChecks = (input, describeSelf, name) => {
  if (input === undefined || input === null) {
    throw new Error(`${describeSelf(name)} value is null or undefined.`)
  }
  if ((typeof input) !== 'string') {
    throw new Error(`${describeSelf(name)} value must be a string.`)
  }
}

export { typeChecks }
