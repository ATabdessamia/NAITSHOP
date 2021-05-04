import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ dropDown, className, dropHidden, text, onClick }) => {
  return (
    <div className="relative">
      <div className={className} onClick={dropDown}>
        <span>{text}</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={`flex flex-col items-start bg-gray-100 rounded-md w-44 shadow-md absolute top-8 left-2 z-30 py-1 text-sm ${dropHidden}`}
      >
        <Link to={`/profile`} className="w-full mb-1 hover:bg-gray-300 p-2">
          profile
        </Link>
        <Link
          to={`/`}
          className="w-full mt-1 hover:bg-gray-300 p-2"
          onClick={onClick}
        >
          logout
        </Link>
      </div>
    </div>
  );
};

export default DropDown;
