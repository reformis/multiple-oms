import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getRandomIntInclusive } from "../utils";

const SignupSchema = Yup.object().shape({
  orderId: Yup.string().required("Required"),
  ticker: Yup.string().required("Required"),
  targetPrice: Yup.string().required("Required"),
  targetQuantity: Yup.string().required("Required"),
  manager: Yup.string().required("Required"),
  trader: Yup.string().required("Required"),
  tradeDate: Yup.string().required("Required"),
  account: Yup.string().required("Required"),
  broker: Yup.string().required("Required"),
  securityType: Yup.string().required("Required"),
  transactionType: Yup.string().required("Required"),
});

const initialValues = {
  orderId: getRandomIntInclusive(1000, 5000),
  ticker: "AAPL",
  targetPrice: 42,
  targetQuantity: 200,
  manager: "Dave",
  trader: "Dave",
  tradeDate: new Date().toISOString().split("T")[0],
  account: "PF76876",
  broker: "CS",
  securityType: "CB",
  transactionType: "D",
};

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: any;
  disabled?: boolean;
}
const TextInputField = ({
  name,
  label,
  placeholder,
  type,
  disabled = false,
}: InputProps) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
    <ErrorMessage name={name} component="span" />
  </div>
);

interface ISelectField extends InputProps {
  options: { label: string; value: string | number }[];
}

// Renders an HTML <select>
const SelectField = ({
  name,
  label,
  placeholder,
  type,
  disabled = false,
  options = [],
}: ISelectField) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <Field name={name} disabled={disabled} as="select">
      {options.length &&
        options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </Field>
    <ErrorMessage name={name} component="span" />
  </div>
);

export function OrderForm() {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          let date = new Date(values.tradeDate);
          date.setDate(date.getDate() + 2);
          const settlementDate = date.toISOString().split("T")[0];

          const order = {
            ...values,
            securityId: getRandomIntInclusive(1000, 5000),
            settlementDate,
            targetAmount:
              Number(values.targetPrice) * Number(values.targetQuantity),
            status: "NEW",
            executedQuantity: 0,
          };

          /*
          ticker: "",
          securityId: "",
          targetPrice: "",
          targetQuantity: "",
          targetAmount: "",
          manager: "",
          trader: "",
          tradeDate: "",
          settlementDate: "",
          account: "",
          status: "NEW",
          executedQuantity: "",
          broker: "",
          securityType: "",
          transactionType: "",
          createDate: "", */

          // add the order to state
          // broadcast the order to combined blotter
          console.log(order);
        }}
      >
        <Form>
          <TextInputField
            name="orderId"
            label="Order ID"
            disabled={true}
          ></TextInputField>
          <TextInputField name="ticker" label="Ticker"></TextInputField>
          <TextInputField
            name="targetPrice"
            label="Target Price"
            type="number"
          ></TextInputField>
          <TextInputField
            name="targetQuantity"
            label="Target Quantity"
            type="number"
          ></TextInputField>
          <SelectField name="manager" label="Manager" options={[]} />
          <SelectField
            name="account"
            label="Account"
            options={[
              { value: "PF76876", label: "PF76876" },
              { value: "PF98765", label: "PF98765" },
              { value: "PF43567", label: "PF43567" },
              { value: "PF98262", label: "PF98262" },
              { value: "PF98383", label: "PF98383" },
              { value: "PF19827", label: "PF19827" },
              { value: "PF43537", label: "PF43537" },
              { value: "PF72763", label: "PF72763" },
              { value: "PF37363", label: "PF37363" },
            ]}
          />
          <SelectField name="trader" label="Trader" options={[]} />
          <TextInputField
            name="tradeDate"
            label="Trade Date"
            type="date"
          ></TextInputField>
          <SelectField
            name="broker"
            label="Broker"
            options={[
              { value: "CS", label: "CS" },
              { value: "JPM", label: "JPM" },
              { value: "CITI", label: "CITI" },
              { value: "MS", label: "MS" },
              { value: "BARC", label: "BARC" },
            ]}
          />
          <SelectField
            name="securityType"
            label="Security Type"
            options={[
              { value: "CB", label: "CB" },
              { value: "GB", label: "GB" },
              { value: "COM", label: "COM" },
              { value: "PFD", label: "PFD" },
            ]}
          />
          <SelectField
            name="transactionType"
            label="Transaction Type"
            options={[
              { value: "BUYL", label: "BUYL" },
              { value: "SELL", label: "SELLL" },
            ]}
          />
          <SelectField
            name="duration"
            label="duration"
            options={[
              { value: "D", label: "D" },
              { value: "GTC", label: "GTC" },
              { value: "GTD", label: "GTD" },
              { value: "FOK", label: "FOK" },
            ]}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
