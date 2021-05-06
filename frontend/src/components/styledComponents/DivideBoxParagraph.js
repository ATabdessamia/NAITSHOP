import React from "react";

const DivideBoxParagraph = ({ title, children }) => {
  return (
    <p className="mb-1">
      <strong className="font-normal mr-1 capitalize">{title}:</strong>
      {children}
    </p>
  );
};

export default DivideBoxParagraph;
