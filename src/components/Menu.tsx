import { sendOrderToCombinedApp } from "../hooks/useOrders";
import { Order } from "../types/orders";

export default function Menu({ order }: { order: Order }) {
  return (
    <div id="menu">
      <ul>
        <li
          onClick={() => {
            order && sendOrderToCombinedApp(order);
          }}
          
         
        >
          Send To Combined Blotter
        </li>
        
      </ul>
    </div>
  );
}
