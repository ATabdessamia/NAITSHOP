import React from "react";

const CardSpan = ({ text, strong }) => {
  return (
    <span className="flex-grow max-w-full flex-basis-0">
      {text}
      {strong ? <strong>${strong}</strong> : ""}
    </span>
  );
};

export default CardSpan;
