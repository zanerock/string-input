// data culled from https://en.wikipedia.org/wiki/Payment_card_number 2024-07-19
const cardData = [
  { iins: [34, 37], network: 'American Express', lengths: [15], validation: 'luhn' },
  { iins: [56445600], network: 'AfriGo', lengths: [18], validation: undefined },
  { iins: [31], network: 'China T-Union', lengths: [19], validation: 'luhn' },
  { iins: [62], network: 'China UnionPay', lengths: [16, 17, 18, 19], validation: 'luhn' },
  { 
    iins: [30, 36, 38, 39],
    network: "Diner's Club International",
    lengths: [14, 15, 16, 17, 18, 19],
    validation: 'luhn'
  },
  {
    iins: [6011, /^64[4-9]/, 65, /^622(?:12[6-9]|[3-8]\d{2}|9[0-1]\d|92[0-5])/],
    network: 'Discover Card',
    lengths: [16, 17, 18, 19],
    validation: 'luhn'
  },
  // https://www.technofino.in/community/threads/all-rupay-credit-card-issuer-bank-list-how-to-change-visa-card-to-rupay-credit-card.887/page-38
  { iins: [65], network: 'Discover Card', cobrand: 'RuPay', lengths: [16], validation: 'luhn' },
  { 
    iins: [/^604(?:00[1-9]\d\d|0[1-9]\d{3}|1\d{4}|200\d\d)/],
    network: 'UkrCard',
    lengths: [16, 17, 18, 19],
    validation: 'luhn'
  },
  // https://www.forbes.com/advisor/in/credit-card/what-does-your-credit-card-number-mean/
  { iins: [6521, 6522, 81, 82, 508, 353, 356], network: 'RuPay', lengths: [16], validation: 'luhn' },
  { iins: [636], network: 'InterPayment', lengths: [16, 17, 18, 19], validation: 'luhn' },
  { iins: [/^63[7-9]/], network: 'InstaPayment', lengths: [16], validation: 'luhn' },
  { iins: [/^352(?:[8-9]|35[4578]\d)/], network: 'JCB', lengths: [16], validation: 'luhn' },
  // https://www.technofino.in/community/threads/all-rupay-credit-card-issuer-bank-list-how-to-change-visa-card-to-rupay-credit-card.887/page-38
  { iins: [353, 356], network: 'JCB', cobrand: 'RuPay', lengths: [16], validation: 'luhn' },
  { iins: [6304, 6706, 6771, 6709], network: 'Laser', lengths: [16, 17, 18, 19], validation: 'luhn' },
  { 
    iins: [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
    network: 'Maastro',
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    validation: 'luhn'
  },
  { iins: [5019, 4571], network: 'Dankort', lengths: [16], validation: 'luhn' },
  { iins: [/^220[0-4]/], network: 'Mir', lengths: [16, 17, 18, 19], validation: 'luhn' },
  { iins: [2205], network: 'BORICA', lengths: [16, 17, 18, 19], validation: 'luhn' },
  { iins: [/^605474[0-4]/], network: 'NPS Pridnestrovie', lengths: [16], validation: 'luhn'},
  { 
    // some 55 cards are issued by Diners Club, but processed as Mastercard
    iins: [/^5[1-5]/, /^2(?:22[1-9]|2[3-9]\d|[3-6]\d\d|7[0-1]\d|720)/],
    network: 'Mastercard',
    lengths: [16],
    validation: 'luhn'
  },
  { iins: [6334, 6767], network: 'Solo', lengths: [16, 18, 19], validation: 'luhn' },
  { 
    iins: [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
    network: 'Switch',
    lengths: [16, 18, 19],
    validation: 'luhn'
  },
  // https://www.chargebackgurus.com/blog/bank-identification-number#:~:text=45,BIN%20determine%20the%20issuing%20party.
  { iins: [/9792[0-8]\d/], network: 'Troy', lengths: [16], validation: 'luhn' },
  { iins: [4], network: 'Visa', lengths: [13, 16, 19], validation: 'luhn' },
  { iins: [4026, 417500, 4508, 4844, 4913, 4917], network: 'Visa Electron', lengths: [16], validation: 'luhn' },
  { iins: [1], network: 'UATP', lengths: [15], validation: 'luhn' },
  { 
    iins: [/^506(?:099|1[0-8]\d|19[0-8])/, /^6500(?:0[2-9]|1\d|2[0-7])/, /^507(?:86[5-9]|8[7-9]\d|9[0-5]\d|96[0-4])/],
    network: 'Verve',
    lengths: [16, 18, 19],
    validation: 'luhn'
  },
  { iins: [357111], network: 'LankaPay', lengths: [16], validation: undefined },
  { iins: [8600, 5614], network: 'UzCard', lengths: [16], validation: undefined },
  { iins: [9860], network: 'Humo', lengths: [16], validation: undefined },
  // 
  { iins: [1946, 50, 56, 58, /^6[0-3]/], network: 'GPN', lengths: [16, 18, 19], validation: 'luhn' },
  { iins: [60], network: 'GPN', cobrand: 'RuPay', lengths: [16, 18, 19], validation: 'luhn' },
  { iins: [9704], network: 'Napas', lengths: [16, 19], validation: undefined }
]

export { cardData }