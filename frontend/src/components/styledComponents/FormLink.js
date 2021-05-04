import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ className, question, to, text }) => {
  return (
    <div className={className}>
      <div className="text-gray-700 text-opacity-80">
        {question}?{" "}
        <Link to={to} className="text-gray-700 hover:underline">
          {text}
        </Link>
      </div>
    </div>
  );
};

export default FormLink;
