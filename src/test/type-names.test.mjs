import * as types from '../index'

const typeList = Object.entries(types).filter(([name]) => name !== 'getLatestTLDs')

test.each(typeList)('%s has a defined description', (name, type) => expect(type.description).not.toBe(undefined))
