import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="container p-2">
      <div className="mx-auto w-full lg:w-1/2 sm:w-3/5">{children}</div>
    </div>
  );
};

export default FormContainer;
