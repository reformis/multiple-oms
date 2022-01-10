import { addContextListener } from '@finos/fdc3';
import { useCallback, useEffect } from 'react'
import { useImmerReducer } from 'use-immer';
import { Order, OrderContext } from '../types/orders';
import { getRandomIntInclusive } from '../utils';

interface Props {
  defaultValue: Order[];
  appName: string;
}

export default function useOrders(props: Props) {
  const { defaultValue, appName } = props

  const [orders, dispatch] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "add":
          draft.push(action.order)
          break;
        case "fill":
          //Todo:test this
          const orderFill = draft.find((order) => order.orderId === action.id);
          orderFill?.fills.push(action.placement)
          break;
        case "placement":
          //Todo:test this
          const orderPlacement = draft.find((order) => order.orderId === action.id);
          orderPlacement?.placements.push(action.placement)
          break;
        default:
          console.warn("no action taken - order reducer")
          break;
      }
    },
    defaultValue
  );

  const addOrder = useCallback((newOrder: Order) => {
    // check to make sure it's not already in the orders before we try and add it

    const index = orders.findIndex((order) => newOrder.orderId === order.orderId);

    if (index) return


    dispatch({
      type: "add",
      order: newOrder
    });

  }, [dispatch, orders]);

  const addFill = useCallback(({ orderId, placement }: { orderId: string, placement: any }) => {
    dispatch({
      type: "fill",
      orderId,
      placement
    });
  }, [dispatch]);

  const addPlacement = useCallback(({ orderId, allocation }: { orderId: string, allocation: any }) => {
    dispatch({
      type: "placement",
      orderId,
      allocation
    });
  }, [dispatch]);

  useEffect(() => {
    const listener = addContextListener("finsemble.order", (context: OrderContext) => {


      console.log(context?.order?.appName, appName)

      if (!context.order) return
      if (context.order.appName !== "Combined" && context.order.appName === appName) return;

      const { order } = context
      console.log(order)
      addOrder(order)
    })
    return () => {
      listener.unsubscribe()
    }
  }, [addOrder, appName])


  /**
   * Flow:
   * Allocations > Placements > Fills
   *
   * To place/fill choose a random time value and then start pushing into the placement or fill array.
   *
   */
  const startPlacementAndFill = (orderId: string) => {
    const index = orders.findIndex((order) => orderId === order.orderId);
    const order = orders[index]

    if (order.allocations.length !== 0) {
      setTimeout(() => {
        //fill order
        startPlacementAndFill(orderId)
      }, getRandomIntInclusive(500, 3000));
    };

    if (order.placements.length !== 0) {
      setTimeout(() => {
        //fill order
        startPlacementAndFill(orderId)
      }, getRandomIntInclusive(500, 3000));
    }
  }


  //use effect once to map through all orders and kick off the placementAndFill




  /**
   * Notifications:
   * If the draft state is !filled and the new state == filled then send Notification.
   *
   */


  return {
    orders, addOrder, addFill, addPlacement
  }
}


/**
 * calculates how much is left to fill in percentage
 * @param order
 * @returns
 */
export function percentComplete(order: Order) {

  const { allocations = [], placements = [], fills = [] } = order


  const total = allocations.length + placements.length + fills.length || 0

  if (total === 0) return total

  return Math.round((total / fills.length) * 100)
}
