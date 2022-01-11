import Blotter from '../components/Blotter';
import { Order, OrderContext } from '../types/orders';
import useOrders from '../hooks/useOrders';
import { useEffect } from 'react';
import { getOrCreateChannel } from '@finos/fdc3';


export default function MUREX() {
  const appName = "Combined"

  const { orders, addOrder } = useOrders({ defaultValue: [], appName })

  useEffect(() => {
    const setUpChannelListener = async () => {
      const channel = await getOrCreateChannel("orders")
      const listener = channel.addContextListener("finsemble.order", (context: OrderContext) => {
        if (!context.order) return

        // only add orders if they come from a different app or if they come from the Combined blotter
        if (context.order.appName === appName) return;

        addOrder(context.order)
      })
      return listener
    }

    const channelListener = setUpChannelListener()
    return () => {
      channelListener.then(listener => listener.unsubscribe())
    }
  }, [addOrder])

  return (
    <Blotter appName={appName} title="Combined" appCSS="combined" orders={orders as Order[]} />
  );
}
