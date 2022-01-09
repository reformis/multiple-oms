import { addContextListener } from '@finos/fdc3';
import { useCallback } from 'react'
import { useImmer } from 'use-immer';
import { Order, OrderContext } from '../types/orders';

interface Props {
  defaultValue: Order[];
  appName: string;
}

export default function useOrders(props: Props) {
  const { defaultValue, appName } = props
  const [orders, setOrders] = useImmer<Order[]>(defaultValue)

  const handleToggle = useCallback((order: Order) => {
    setOrders((draft) => {
      const index = draft.findIndex((order) => order?.orderId === order.orderId);

      // if (index !== -1) {
      //   draft[index] = order
      // } else {
      draft.push(order)
      // }
    });
  }, [setOrders]);


  addContextListener("finsemble.order", (context: OrderContext) => {
    console.log(context?.order?.appName, appName)
    if (!context.order) return
    if (context.order.appName === appName) return;

    const { order } = context
    handleToggle(order)
  })

  return {
    orders
  }
}
