

/* list of:
- brokers
- securities
- traders
- managers
- Status
- securityType
*/

// what do placements look like
// what do fills look like
// what do allocations look like


//  actions on the combined OMS

import produce from 'immer'
const data = require('./data2.json')

const a = {
  "orderId": "1234",
  "system": "BBAIM/MUREX/CRD1/CRD2/CRD3",
  "securityName": "VOD.LN",
  "securityId": "1234",
  "targetPrice": "22.39",
  "targetQuantity": "22.39",
  "targetAmount": "2000",
  "manager": "CWATSON",
  "trader": "CWATSON",
  "tradeDate": "22/02/2021",
  "account": "multi",
  "status": "OPEN",
  "broker": "CS",
  "securityType": "CB",
  "transactionType": "BUY / SELL",
  "createDate": "20/02/2021"
}

Object.keys(a)


const brokers = [
  'AMAB',
  'AUBK',
  'BKCP',
  'BMIS',
  'BPIM',
  'BDOC',
  'PBDO',
  'BSCB',
  'BDOM',
  'BPIC',
  'CBCM',
  'CCBM',
  'CFSI',
  'DEVP',
  'EWBC',
  'FMIC',
  'FMSB',
  'LBPH',
  'MAYB',
  'MBML',
  'MIBC',
  'PBBK',
  'PBCM',
  'PCCI',
  'PNBM',
  'PVBM',
  'RCBC',
  'RSBK',
  'SBMN',
  'SCML',
  'STRL',
  'HBPH',
  'UNCB',
  'UBPH',
  'UCPB'
]

const orders = produce(data, draft => {
  const index = draft.findIndex(todo => todo.orderId === "98520")
  if (index !== -1) draft[index] = {
    "orderId": "98520",
    "securityName": "TIF",
    "securityId": "29093",
    "targetPrice": 34.45,
    "targetAmount": "34.45",
    "manager": "Kayne McKeeman",
    "trader": "Innis Oxborrow",
    "tradeDate": "05/11/2021",
    "account": "Shanahan and Sons",
    "status": "OPEN",
    "broker": "CBCM",
    "securityType": "CB",
    "transactionType": "BUY",
    "createDate": "11/13/2021",
    "targetQuantity": 483
  }
})

console.log(orders)