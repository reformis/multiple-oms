import data from './data2.json'

import Blotter from './components/Blotter';
import { Order } from './types/orders';
import useOrders from './hooks/useOrders';
import { shuffle } from './utils';

export default function OMS1() {
  const appName = "OMS1"

  const { orders } = useOrders({ defaultValue: shuffle(data) as Order[], appName })

  return (
    <Blotter appName={appName} title="OMS 1" appCSS="oms1" orders={orders as Order[]} />
  );
}

