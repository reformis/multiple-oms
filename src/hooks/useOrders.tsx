import { addContextListener } from "@finos/fdc3";
import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Order, OrderContext } from "../types/orders";

interface Props {
  defaultValue: Order[];
  appName: string;
}

export default function useOrders(props: Props) {
  const { defaultValue, appName } = props;

  const [orders, dispatch] = useImmerReducer((draft, action) => {
    switch (action.type) {
      case "add":
        draft.unshift(action.order);
        break;
      case "delete":
        draft.splice(action.orderIndex, 1);
        break;
      case "update":
        const index = draft.findIndex(
          (order) => order.orderId === action.order.orderId
        );
        if (index !== -1) draft[index] = action.order;
        break;
      case "fill":
        //From the order get a placement remove it from the placements array and move it to the fills array
        const orderFillIndex = draft.findIndex(
          (order) => order.orderId === action.orderId
        );

        if (orderFillIndex === -1) return;

        if (action.executedQuantity) {
          draft[orderFillIndex].executedQuantity = action.executedQuantity;
        }
        if (action.status) {
          draft[orderFillIndex].status = action.status;
        }

        break;
      default:
        console.warn("no action taken - order reducer");
        break;
    }
  }, defaultValue);

  const addOrder = useCallback(
    (newOrder: Order) => {
      // check to make sure it's not already in the orders before we try and add it
      const index = orders.find(
        (order) =>
          newOrder.orderId === order.orderId &&
          newOrder.appName === order.appName
      );

      if (index) return;

      dispatch({
        type: "add",
        order: newOrder,
      });
    },
    [dispatch, orders]
  );

  const updateOrder = useCallback(
    (updatedOrder: Order) => {
      dispatch({
        type: "update",
        order: updatedOrder,
      });
    },
    [dispatch]
  );

  const deleteOrder = useCallback(
    (order: Order) => {
      const orderIndex = orders.findIndex((o) => o.orderId === order.orderId);
      dispatch({
        type: "delete",
        orderIndex,
      });
    },
    [dispatch, orders]
  );

  const updateFill = useCallback(
    (order: Order) => {
      const { targetQuantity, status } = order;

      if (status === "FILLED" || status === "ACCNT") {
        console.log("ORDER has already been filled or completed");
      }

      // only fill if thee message comes from combined or the destination app matches the app name
      if (appName === "combined" || order.destinationApp === appName) {
        const xPercent = Number(targetQuantity) * 0.25;

        const fillOrder = (amount: number) => {
          let fillAmount = amount + xPercent;

          if (fillAmount > targetQuantity || status === "FILLED") {
            dispatch({
              type: "fill",
              orderId: order.orderId,
              status: "FILLED",
            });
            return;
          }

          setTimeout(() => {
            dispatch({
              type: "fill",
              orderId: order.orderId,
              executedQuantity: Math.round(fillAmount),
              status: "WORKING",
            });
            fillOrder(fillAmount);
          }, 2000);
        };

        fillOrder(0);
      }
    },
    [appName, dispatch]
  );

  return {
    orders,
    addOrder,
    updateFill,
    deleteOrder,
    updateOrder,
  };
}

interface UseOrderProps {
  updateOrder?: (newOrder: Order) => void;
  addOrder?: (newOrder: Order) => void;
  deleteOrder?: (newOrder: Order) => void;
  updateFill?: (newOrder: Order) => void;
  appName: string;
}
export const orderContextListener = (props: UseOrderProps) => {
  const { addOrder, deleteOrder, updateOrder, updateFill, appName } = props;

  const listener = addContextListener(
    "finsemble.order",
    (context: OrderContext) => {
      console.group();
      console.log("context received");
      console.log(context);
      console.groupEnd();
      if (!context.order) return;
      if (context.order.destinationApp !== appName) return;

      switch (context.action) {
        case actions.ADD:
          addOrder && addOrder(context.order);
          break;
        case actions.UPDATE:
          updateOrder && updateOrder(context.order);
          break;
        case actions.FILL:
          updateFill && updateFill(context.order);
          break;
        case actions.DELETE:
          deleteOrder && deleteOrder(context.order);
          break;

        default:
          console.log("no action provided in context.");
          break;
      }
    }
  );
  return listener;
};

export const actions = {
  UPDATE: "update",
  DELETE: "delete",
  ADD: "add",
  FILL: "fill",
};
