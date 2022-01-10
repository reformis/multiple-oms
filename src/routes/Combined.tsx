import Blotter from '../components/Blotter';
import { Order } from '../types/orders';
import useOrders from '../hooks/useOrders';


export default function MUREX() {
  const appName = "Combined"

  const { orders } = useOrders({ defaultValue: [], appName })

  return (
    <Blotter appName={appName} title="Combined" appCSS="combined" orders={orders as Order[]} />
  );
}