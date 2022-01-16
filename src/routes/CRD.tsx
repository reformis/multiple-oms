import data from "../mock-data/data2.json";

import Blotter from "../components/Blotter";
import { Order } from "../types/orders";
import useOrders from "../hooks/useOrders";
import { shuffle } from "../utils";
import { OrderForm } from "../components/OrderForm";
import Menu from "../components/Menu";
import ContextMenu from "../components/ContextMenu";

export default function CRD() {
  const appName = "CRD";

  const { orders, addOrder } = useOrders({
    defaultValue: shuffle(data) as Order[],
    appName,
  });

  return (
    <>
      <Blotter
        appName={appName}
        title="CRD"
        appCSS="crd"
        orders={orders as Order[]}
        menu={(props) => (
          <ContextMenu>
            <Menu {...props} />
          </ContextMenu>
        )}
      >
        <OrderForm appName={appName} addOrder={addOrder} />
      </Blotter>
    </>
  );
}
