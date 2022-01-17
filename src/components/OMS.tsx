import { useState } from "react";
import Blotter from "../components/Blotter";
import ContextMenu from "../components/ContextMenu";
import Menu from "../components/Menu";
import NewOrderButton from "../components/NewOrderButton";
import { OrderForm } from "../components/OrderForm";
import useOrders from "../hooks/useOrders";
import data from "../mock-data/data2.json";
import { Order } from "../types/orders";
import { shuffle } from "../utils";

interface Props {
  appCSS: string;
  appName: string;
  title: string;
}

export default function OMS(props: Props) {
  const { appName, appCSS, title } = props;
  const { orders, addOrder } = useOrders({
    defaultValue: shuffle(data) as Order[],
    appName,
  });

  const [orderFormIsVisible, setOrderFormIsVisible] = useState(false);

  return (
    <>
      <Blotter
        appCSS={appCSS}
        appName={appName}
        orders={orders as Order[]}
        title={title}
        menu={(props) => (
          <ContextMenu>
            <Menu {...props} />
          </ContextMenu>
        )}
      >
        {!orderFormIsVisible ? (
          <NewOrderButton showForm={() => setOrderFormIsVisible(true)} />
        ) : (
          <OrderForm
            addOrder={addOrder}
            appName={appName}
            hideForm={() => setOrderFormIsVisible(false)}
          />
        )}
      </Blotter>
    </>
  );
}
