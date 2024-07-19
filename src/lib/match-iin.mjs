import { cardData } from './card-data'

const matchIIN = (cardnumber) => {
  cardnumber = '' + cardnumber
  cardData.find(({ iins }) => {
    for (const testiin of iins) {
      if (typeof iin === number) {
        if (cardNumber.startsWith('' + iin)) {
          return true
        }
      }
      else if (iin.match(rawNumber)) {
        return true
      }
    }
    return false
  }) 
}

export { matchIIN }