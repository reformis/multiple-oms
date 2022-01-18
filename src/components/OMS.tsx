import { broadcast } from "@finos/fdc3";
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
  // Holds all the state and logic for the orders
  const { orders, addOrder } = useOrders({
    defaultValue: shuffle(data) as Order[],
    appName,
  });

  const [orderFormIsVisible, setOrderFormIsVisible] = useState(false);

  // display either the order button or the order form
  const NewOrder = () =>
    !orderFormIsVisible ? (
      <NewOrderButton showForm={() => setOrderFormIsVisible(true)} />
    ) : (
      <OrderForm
        addOrder={addOrder}
        appName={appName}
        hideForm={() => setOrderFormIsVisible(false)}
      />
    );

  const Title = () => <header className="App-header">{title}</header>;

  const SendOrderMenu = (props: JSX.IntrinsicAttributes & { order: Order }) => (
    <ContextMenu>
      <Menu {...props} />
    </ContextMenu>
  );

  const broadcastTicker = (order: Order) => {
    broadcast({
      type: "fdc3.instrument",
      id: {
        ticker: order.ticker,
      },
    });
  };

  return (
    <div className={`${appCSS} App`}>
      <Title />
      <NewOrder />
      <Blotter
        appName={appName}
        orders={orders as Order[]}
        menu={SendOrderMenu}
        rowClickAction={broadcastTicker}
      ></Blotter>
    </div>
  );
}
