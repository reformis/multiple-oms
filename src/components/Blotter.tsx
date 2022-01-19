import { ReactNode, useState } from "react";
import "../styles.css";
import { Order } from "../types/orders";

/**
 * Full execution:
 * On the combined blotter :
 * - execute button
 *  - toggle to execute multiple
 *  - the OMS it came from executes and the same time as the combine blotter
 * - when done can click a done button and will remove the order from the combined blotter but not the other OMS
 */
interface Props {
  appName: string;
  checkboxAction?: Function;
  children?: ReactNode;
  menu?: ({ order }: { order: Order }) => ReactNode;
  orders: Array<Order>;
  rowCheckbox?: boolean;
  rowClickAction?: Function;
  selectedOrders?: Order[];
}

export default function Blotter(props: Props) {
  const {
    appName,
    checkboxAction,
    menu,
    orders,
    rowCheckbox = false,
    rowClickAction,
    selectedOrders,
  } = props;

  const [currentOrder, setCurrentOrder] = useState<Order>();

  return (
    <div>
      {menu && currentOrder && menu({ order: { ...currentOrder, appName } })}
      {props.children}
      <table>
        <thead>
          <tr>
            {rowCheckbox && <th></th>}
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
              onClick={() => {
                // only do the action when there is a rowClickAction
                rowClickAction && rowClickAction(item);
              }}
              onContextMenu={() => {
                //only send the order if there is a context menu (contextMenu is a right click)
                menu && setCurrentOrder(item);
              }}
              style={{
                backgroundColor:
                  selectedOrders?.find(
                    ({ orderId }) => orderId === item.orderId
                  ) && "rgb(181 255 176 / 55%)",
              }}
            >
              {rowCheckbox && (
                <td>
                  <input
                    type="checkbox"
                    name="selectRow"
                    onChange={() => checkboxAction && checkboxAction(item)}
                  ></input>
                </td>
              )}
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
                    item.transactionType === "SELLL"
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
