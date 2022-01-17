import { Context } from '@finos/fdc3';
export interface OrderContext extends Context {
  order?: Order
}


export interface Order {
  account: string;
  appName?: string;
  broker: string;
  destinationApp?: string;
  duration: string;
  executedQuantity: number | string;
  instruction: string;
  limit: string;
  manager: string;
  orderId: string | number;
  securityId: string | number;
  securityType: string;
  settlementDate: string | Date;
  status: "NEW" | "OPEN" | "ACCNT" | "WORKING" | "FILLED";
  targetAmount: string | number;
  targetPrice: string | number;
  targetQuantity: string | number;
  ticker: string;
  tradeDate: string | Date;
  trader: string;
  transactionType: "BUYL" | "SELLL";
}

