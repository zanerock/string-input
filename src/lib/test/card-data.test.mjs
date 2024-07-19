import { cardData } from '../card-data'
import { matchIIN } from '../match-iin'

describe('cardData', () => {
  test("entries define 'iins', 'network', 'lengths', and 'validation'", () => {
    for (const entry of cardData) {
      const fields = Object.keys(entry).sort()
      if (fields.length === 4) {
        expect(fields).toEqual(['iins', 'lengths', 'network', 'validation'])
      }
      else if (fields.length === 5) {
        expect(fields).toEqual(['cobrand', 'iins', 'lengths', 'network', 'validation'])
      }
      else {
        throw new Error('Unexpected fields in entry: ' + fields.join(', '))
      }
      for (const iin of entry.iins) {
        expect(iin.test !== undefined || (typeof iin) === 'number').toBe(true)
        if (iin.test !== undefined) {
          expect(iin.toString()).toMatch(/^\/[^]/)
        }
      }
      for (const length of entry.lengths) {
        expect(typeof length === 'number').toBe(true)
      }
    }
  })

  test('iins are distinct and disjoint', () => {
    for (let i = 1; i < 100000000; i += 1) {
      const rawNumber = '' + i
      const matches = cardData.filter(({ iins }) => {
        for (const iin of iins) {
          if (typeof iin === 'number') {
            if (rawNumber.startsWith('' + iin)) {
              return true
            }
          }
          else if (iin.test(rawNumber)) {
            return true
          }
        }
        return false
      })
      const matchCount = matches.length
      if (!(matchCount === 1 || matchCount === 0)) {
        console.log(matches)
        throw new Error(`IIN ${rawNumber} has multiple matches: ${matches.map(({ network }) => network).join(', ')}`)
      }
    }
  })
})