import Blotter from '../components/Blotter';
import { Order, OrderContext } from '../types/orders';
import useOrders from '../hooks/useOrders';
import { useEffect } from 'react';
import { addContextListener, getOrCreateChannel } from "@finos/fdc3";
import * as FSBL from "@finsemble/finsemble-core";

export default function MUREX() {
  const appName = "combined";

  const { orders, addOrder } = useOrders({ defaultValue: [], appName });

  useEffect(() => {
    const listener = addContextListener(
      "finsemble.order",
      (context: OrderContext) => {
        console.log(context?.order?.appName, appName);

        if (!context.order) return;

        // only add orders if they come from a different app or if they come from the Combined blotter
        // if (context.order.appName !== "combined" && context.order.appName === appName) return;

        console.log(context.order);
        context.order.status = "NEW";
        addOrder(context.order);

        // send a notification
        if (window.FSBL) {
          FSBL.Clients.NotificationClient.notify({
            // id: "adf-3484-38729zg", // distinguishes individual notifications - provided by Finsemble if not supplied
            // issuedAt: "2021-12-25T00:00:00.001Z", // The notifications was sent - provided by Finsemble if not supplied
            // type: "configDefinedType", // Types defined in the config will have those values set as default
            source: "Finsemble", // Where the Notification was sent from
            title: `New Order from ${context.order.appName}`,
            details: `${context.order.ticker} at ${context.order.targetAmount}`,
            // headerLogo: "URL to Icon",
            // actions: [], // Note this has no Actions making it Informational
            // meta: {} // Use the meta object to send any extra data needed in the notification payload
          });
        }
      }
    );
    return () => {
      listener.unsubscribe();
    };
  }, [addOrder, appName]);

  useEffect(() => {
    return () => {};
  }, [orders]);

  // useEffect(() => {
  //   const setUpChannelListener = async () => {
  //     const channel = await getOrCreateChannel("orders")
  //     const listener = channel.addContextListener("finsemble.order", (context: OrderContext) => {
  //       if (!context.order) return

  //       // only add orders if they come from a different app or if they come from the Combined blotter
  //       if (context.order.appName === appName) return;

  //       addOrder(context.order)
  //     })
  //     return listener
  //   }

  //   const channelListener = setUpChannelListener()
  //   return () => {
  //     channelListener.then(listener => listener.unsubscribe())
  //   }
  // }, [addOrder])

  return (
    <Blotter
      appName={appName}
      title="Combined"
      appCSS="combined"
      orders={orders as Order[]}
    />
  );
}
