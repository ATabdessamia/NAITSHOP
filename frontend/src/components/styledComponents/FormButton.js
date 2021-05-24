import React from "react";

const FormButton = ({ text, className }) => {
  return (
    <button type="submit" className={className}>
      {text}
    </button>
  );
};

FormButton.defaultProp = {
  className:
    "bg-green-900 opacity-90 text-green-100 uppercase px-6 py-3 md:py-2 md:px-4 lg:py-3 lg:px-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm my-2 text-center transition-colors ease-in-out",
};
export default FormButton;
