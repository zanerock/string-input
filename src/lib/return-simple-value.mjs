import { configureStringInput } from '../configure-string-input'

const returnSimpleValue = (simpleValue) => (simpleValue !== undefined && simpleValue === true)
  || (simpleValue === undefined && configureStringInput('simpleValue') === true)

export { returnSimpleValue }