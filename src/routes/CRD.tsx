import data from '../mock-data/data2.json'

import Blotter from '../components/Blotter';
import { Order } from '../types/orders';
import useOrders from '../hooks/useOrders';
import { shuffle } from '../utils';
import { OrderForm } from '../components/OrderForm';


export default function CRD() {
  const appName = "CRD"

  const { orders } = useOrders({ defaultValue: shuffle(data) as Order[], appName })

  return (
    <>
      <Blotter appName={appName} title="CRD" appCSS="crd" orders={orders as Order[]}>
        <OrderForm />
      </Blotter>
    </>
  );
}