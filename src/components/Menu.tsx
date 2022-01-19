import { actions } from "../hooks/useOrders";
import { Order } from "../types/orders";
import { broadcast } from "@finos/fdc3";

export default function Menu({ order }: { order: Order }) {
  const sendOrderToCombinedApp = () => {
    if (!order) return;

    broadcast({
      type: "finsemble.order",
      order: { ...order, destinationApp: "combined" },
      action: actions.ADD,
    });
  };
  return (
    <div id="menu">
      <ul>
        <li onClick={sendOrderToCombinedApp}>Send Order</li>
      </ul>
    </div>
  );
}
