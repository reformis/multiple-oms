import { Context } from '@finos/fdc3'
export interface OrderContext extends Context {
  order?: Order
}


export interface Order {
  appName: string,
  orderId: string | number,
  ticker: string;
  securityId: string | number,
  targetPrice: string | number,
  targetQuantity: string | number,
  targetAmount: string | number,
  manager: string,
  trader: string,
  tradeDate: string | Date,
  settlementDate: string | Date;
  account: string,
  status: "NEW", "WORKING", "FILLED",
  executedQuantity: number | string;
  broker: string,
  securityType: string,
  transactionType: "BUY" | "SELL",
  createDate: string | Date,
  allocations: Array<Allocation>,
  placements: Array<Allocation>,
  fills: Array<Allocation>
}


interface Allocation {
  tradeId: string | number,
  account: string,
  targetQuantity: string | number,
  targetPrice: string | number,
  targetAmount: string | number
}