import data from '../mock-data/data2.json'

import Blotter from '../components/Blotter';
import { Order } from '../types/orders';
import useOrders from '../hooks/useOrders';
import { shuffle } from '../utils';


export default function MUREX() {
  const appName = "MUREX"

  const { orders } = useOrders({ defaultValue: shuffle(data) as Order[], appName })

  return (
    <Blotter appName={appName} title="MUREX" appCSS="murex" orders={orders as Order[]} />
  );
}