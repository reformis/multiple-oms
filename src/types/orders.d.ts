import { Context } from '@finos/fdc3';
export interface OrderContext extends Context {
  order?: Order
}


export interface Order {
  appName?: string;
  destinationApp?: string;
  limit: string;
  instruction: string;
  duration: string;
  orderId: string | number;
  ticker: string;
  securityId: string | number;
  targetPrice: string | number;
  targetQuantity: string | number;
  targetAmount: string | number;
  manager: string;
  trader: string;
  tradeDate: string | Date;
  settlementDate: string | Date;
  account: string;
  status: "NEW" | "OPEN" | "ACCNT" | "WORKING" | "FILLED";
  executedQuantity: number | string;
  broker: string;
  securityType: string;
  transactionType: "BUYL" | "SELLL";
}

