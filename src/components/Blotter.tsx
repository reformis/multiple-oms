import { broadcast } from '@finos/fdc3';

import { Order } from '../types/orders';
import "../styles.css"
import { ReactNode } from 'react';

interface Props {
  orders: Array<Order>;
  appCSS: string;
  title: string;
  appName: string;
  children?: ReactNode;
}

export default function Blotter(props: Props) {
  const { orders, appCSS, title, appName } = props

  const sendOrder = (order: Order) => {
    console.log(order)
    broadcast({ type: "finsemble.order", order: { ...order, appName } });
  }

  return (
    <div className={`${appCSS} App`}>
      <header className="App-header">
        {title}
      </header>
      {props.children}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Ticker</th>
            <th>Security ID</th>
            <th>Tgt Price</th>
            <th>Tgt Quantity</th>
            {/* target price * target Quantity */}
            <th>Tgt Amount</th>
            <th>Account</th>
            <th>Manager</th>
            <th>Trader</th>
            <th>Trade Date</th>
            {/* make settlement date 2 days later */}
            <th>Settlement Date</th>
            <th>Status</th>
            <th>Exec Qty</th>
            <th>Broker</th>
            <th>Security Type</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((item) => <tr key={item.orderId} onClick={() => { sendOrder(item) }}>
              <td>{item.orderId}</td>
              <td>{item.ticker}</td>
              <td>{item.securityId}</td>
              <td className="target-price">{item.targetPrice}</td>
              <td>{item.targetQuantity}</td>
              <td>{item.targetAmount}</td>
              <td>{item.account}</td>
              <td>{item.manager}</td>
              <td>{item.trader}</td>
              <td>{item.tradeDate}</td>
              <td>{item.settlementDate}</td>
              <td style={{ backgroundColor: `var(--${item.status})` }}>{item.status}</td>
              <td>{item.executedQuantity}</td>
              <td>{item.broker}</td>
              <td>{item.securityType}</td>
              <td style={{ color: item.transactionType === "SELL" ? 'var(--CLOSED)' : 'var(--OPEN)' }}>{item.transactionType + "L"}</td>
            </tr>)
          }</tbody>


      </table>
    </div>
  );
}

//TODO: change these
const brokers = ["CS", "JPM", "CITI", "MS", "BARC"]

const securtiyTable = ["CB", "GB", "COM", "PFD"]

// Dave is sending more columns

/**
 * From each blotter there needs to be a way to add an order:
 *  - uuid auto
 */


/**
 * Full exection:
 * On the combined blotter :
 * - execute button
 *  - toggle to execute multiple
 *  - the OMS it came from executes and the same time as the combine blotter
 * - when done can click a done button and will remove the order from the combined blotter but not the other OMS
 */


/**
 * notifications:
 * - order arrives into combined suggesters
 * - something is greater or less than the limit
 */

