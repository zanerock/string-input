import { configureStringInput } from '../configure-string-input'

describe('configureStringInput', () => {
  afterEach(() => configureStringInput())

  test('can set value', () => {
    expect(configureStringInput('simpleValue')).toBe(false)
    configureStringInput('simpleValue', true)
    expect(configureStringInput('simpleValue')).toBe(true)
  })

  test('reset values', () => {
    configureStringInput('simpleValue', true)
    configureStringInput()
    expect(configureStringInput('simpleValue')).toBe(false)
  })
})