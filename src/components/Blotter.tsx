import { broadcast } from '@finos/fdc3';

import { Order } from '../types/orders';
import "../styles.css"
import {
  ReactComponentElement,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";
import { MenuProps } from "./Menu";

interface Props {
  menu(props: MenuProps): ReactNode;
  orders: Array<Order>;
  appCSS: string;
  title: string;
  appName: string;
  children?: ReactNode;
}

export default function Blotter(props: Props) {
  const { orders, appCSS, title, appName } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const showMenu = (order: Order, event: React.MouseEvent<HTMLElement>) => {
    // broadcast({ type: "finsemble.order", order: { ...order, appName } });
    setPosition({ x: event.pageX, y: event.pageY });
    setMenuIsVisible(true);
    console.log(event);
  };

  return (
    <div className={`${appCSS} App`}>
      {props.menu({ show: menuIsVisible, position })}
      <header className="App-header">{title}</header>
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
            <th>Duration</th>
            <th>Instruction</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr
              key={item.orderId}
              onClick={(event) => {
                showMenu(item, event);
              }}
            >
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
              <td style={{ backgroundColor: `var(--${item.status})` }}>
                {item.status}
              </td>
              <td>{item.executedQuantity}</td>
              <td>{item.broker}</td>
              <td>{item.securityType}</td>
              <td
                style={{
                  color:
                    item.transactionType === "SELL"
                      ? "var(--CLOSED)"
                      : "var(--OPEN)",
                }}
              >
                {item.transactionType}
              </td>
              <td>{item.duration}</td>
              <td>{item.instruction}</td>
              <td>{item.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




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

