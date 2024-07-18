const checkMaxMin = ({ input, max, min, selfDescription, value }) => {
  if (max !== undefined && value > max) {
    throw new Error(`${selfDescription} input '${input}' must be less than or equal to '${max}'`)
  }
  if (min !== undefined && value < min) {
    throw new Error(`${selfDescription} input '${input}' must be greater than or equal to '${min}'.`)
  }
}

export { checkMaxMin }