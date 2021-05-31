import React from "react";

const FormRadio = ({ text, checked, onChange, value, id }) => {
  return (
    <label className="inline-flex items-center ml-5">
      <input
        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
        id={id}
        type="radio"
        name="paymentMethod"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-800">{text}</span>
    </label>
  );
};

FormRadio.defaultProps = {
  id: "PayPal",
  text: "PayPal or Credit Card",
};

export default FormRadio;
