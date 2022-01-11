import { addContextListener } from '@finos/fdc3';
import { current, original } from 'immer';
import { useCallback, useEffect } from 'react'
import { useImmerReducer } from 'use-immer';
import { Allocation, Order, OrderContext } from '../types/orders';
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
          //From the order get a placement remove it from the placements array and move it to the fills array
          const orderFillIndex = draft.findIndex((order) => order.orderId === action.orderId);

          const newFill = original(draft)?.[orderFillIndex]?.allocations[0]

          if (!newFill) return

          draft[orderFillIndex].fills.push(newFill)
          draft[orderFillIndex].placements.shift()
          return draft
          break;

        case "placement":
          //From the order get an allocation remove it from the allocation array and move it to the placements array

          const placementIndex = draft.findIndex((order) => order.orderId === action.orderId);
          draft[placementIndex].placements.push(action.allocation)

          break;
        case "deleteAllocation":
          const AllocationOrderIndex = draft.findIndex((order) => order.orderId === action.orderId);
          draft[AllocationOrderIndex].allocations.shift()
          break
        default:

          console.warn("no action taken - order reducer")
          break;
      }
    },
    defaultValue
  );


  const addOrder = useCallback((newOrder: Order) => {
    // check to make sure it's not already in the orders before we try and add it
    const index = orders.find((order) => newOrder.orderId === order.orderId);
    if (index) return

    dispatch({
      type: "add",
      order: newOrder
    });

  }, [dispatch, orders]);

  const addFill = useCallback((orderId: string | number) =>
    dispatch({
      type: "fill",
      orderId
    })
    , [dispatch]);

  const addPlacement = useCallback((orderId: string | number, allocation: Allocation) =>
    dispatch({
      type: "placement",
      orderId,
      allocation
    })
    , [dispatch]);

  // automatically subscribe to any context being sent - for linker selecting (user led)
  useEffect(() => {
    const listener = addContextListener("finsemble.order", (context: OrderContext) => {


      console.log(context?.order?.appName, appName)

      if (!context.order) return

      // only add orders if they come from a different app or if they come from the Combined blotter
      if (context.order.appName !== "Combined" && context.order.appName === appName) return;

      console.log(context.order)
      addOrder(context.order)
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
  const startPlacementAndFill = useCallback((orderId: string | number) => {
    const order = orders.find((order) => orderId === order.orderId);

    if (!order) return

    if (order.allocations.length !== 0) {
      console.log(order.allocations)
      setTimeout(() => {
        //fill order
        const allocation = order.allocations[0]
        addPlacement(orderId, allocation)
        dispatch({
          type: "deleteAllocation",
          orderId
        })
        startPlacementAndFill(orderId)
      }, getRandomIntInclusive(500, 3000));
    };

    if (order.placements.length !== 0) {
      setTimeout(() => {
        //fill order
        addFill(orderId)
        startPlacementAndFill(orderId)
      }, getRandomIntInclusive(500, 3000));
    }
  }, [addFill, addPlacement, dispatch, orders])


  //use effect once to map through all orders and kick off the placementAndFill

  useEffect(() => {
    orders.forEach(({ orderId }) => {
      // startPlacementAndFill(orderId)
    })
  }, [])


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

  return Math.round((fills.length / total) * 100)
}
