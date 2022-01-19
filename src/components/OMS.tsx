import { broadcast } from "@finos/fdc3";
import { useEffect, useState } from "react";
import Blotter from "../components/Blotter";
import ContextMenu from "../components/ContextMenu";
import Menu from "../components/Menu";
import NewOrderButton from "../components/NewOrderButton";
import { OrderForm } from "../components/OrderForm";
import useOrders, { orderContextListener } from "../hooks/useOrders";
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
  const { orders, addOrder, deleteOrder, updateFill } = useOrders({
    defaultValue: shuffle(data) as Order[],
    appName,
  });

  useEffect(() => {
    const listener = orderContextListener({
      addOrder,
      updateFill,
      deleteOrder,
      appName,
    });
    return () => {
      listener.unsubscribe();
    };
  }, []);

  // display either the order button or the order form
  const NewOrder = () => {
    const [orderFormIsVisible, setOrderFormIsVisible] = useState(false);

    return !orderFormIsVisible ? (
      <NewOrderButton showForm={() => setOrderFormIsVisible(true)} />
    ) : (
      <OrderForm
        addOrder={addOrder}
        appName={appName}
        hideForm={() => setOrderFormIsVisible(false)}
      />
    );
  };

  const Title = () => <header className="App-header">{title}</header>;

  const SendOrderMenu = ({ order }: { order: Order }) => (
    <ContextMenu>
      <Menu order={order} />
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
