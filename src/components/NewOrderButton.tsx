import React from "react";

export default function NewOrderButton({ showForm }: { showForm: () => void }) {
  return <button onClick={showForm}>New Order</button>;
}
