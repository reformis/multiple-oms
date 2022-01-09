import { Order } from '../types/orders';

import "../styles.css"
import { broadcast } from '@finos/fdc3';

interface Props {
  orders: Array<Order>;
  appCSS: string;
  title: string;
  appName: string
}

export default function Blotter(props: Props) {
  const { orders, appCSS, title, appName } = props

  const sendOrder = (order: Order) => {
    console.log("order: " + order)
    broadcast({ type: "finsemble.order", order: { ...order, appName } });
  }

  return (
    <div className={`${appCSS} App`}>
      <header className="App-header">
        {title}
      </header>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Name</th>
            <th>ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Manager</th>
            <th>Trader</th>
            <th>Date</th>
            <th>Account</th>
            <th>Status</th>
            <th>Broker</th>
            <th>Security Type</th>
            <th>Side</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((item) => <tr key={item.orderId} onClick={() => { sendOrder(item) }}>
              <td>{item.orderId}</td>
              <td>{item.securityName}</td>
              <td>{item.securityId}</td>
              <td style={{ color: 'yellow' }}>{item.targetPrice}</td>
              <td>{item.targetQuantity}</td>
              <td>{item.targetAmount}</td>
              <td>{item.manager}</td>
              <td>{item.trader}</td>
              <td>{item.tradeDate}</td>
              <td>{item.account}</td>
              <td style={{ backgroundColor: item.status === "CLOSED" ? 'var(--CLOSED)' : 'var(--OPEN)' }}>{item.status}</td>
              <td>{item.broker}</td>
              <td>{item.securityType}</td>
              <td style={{ color: item.transactionType === "SELL" ? 'var(--CLOSED)' : 'var(--OPEN)' }}>{item.transactionType}</td>
              <td>{item.tradeDate}</td>
            </tr>)
          }</tbody>


      </table>
    </div>
  );
}