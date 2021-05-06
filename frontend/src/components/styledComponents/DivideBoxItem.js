import React from "react";

const DivideBoxItem = ({ children, title }) => {
  return (
    <div className="py-3 relative block px-5">
      <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default DivideBoxItem;
