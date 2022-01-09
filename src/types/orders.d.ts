import { Context } from '@finos/fdc3'
export interface OrderContext extends Context {
  order?: Order
}


export interface Order {
  "orderId": string | number,
  "appName": string,
  "securityName": string,
  "securityId": string | number,
  "targetPrice": string | number,
  "targetQuantity": string | number,
  "targetAmount": string | number,
  "manager": string,
  "trader": string,
  "tradeDate": string | Date,
  "account": string,
  "status": string,
  "broker": string,
  "securityType": string,
  "transactionType": "BUY" | "SELL",
  "createDate": string | Date,
  "allocations": [
    {
      "tradeId": string | number,
      "account": string,
      "targetQuantity": string | number,
      "targetPrice": string | number,
      "targetAmount": string | number
    }
  ],
  "placement": [
    {}
  ],
  "fills": [
    {}
  ]
}