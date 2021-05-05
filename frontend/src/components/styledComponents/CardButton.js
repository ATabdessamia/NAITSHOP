import React from "react";

const CardButton = ({ onClick, text, className, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

CardButton.defaultProps = {
  className:
    "bg-green-900 opacity-90 text-gray-100 uppercase w-full p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm transition-colors ease-in-out",
  disabled: false,
};

export default CardButton;
