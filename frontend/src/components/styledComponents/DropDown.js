import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({
  dropDown,
  className,
  dropHidden,
  text,
  onClick,
  isAdmin,
}) => {
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
        className={`bg-gray-100 rounded-md w-44 shadow-md absolute top-8 left-2 z-30  text-sm ${dropHidden} border border-gray-300 text-gray-600`}
      >
        {isAdmin && (
          <span className="border-gray-300 border-b max-w-full flex flex-col w-full py-1 items-start">
            <Link
              to={`/admin/userList`}
              className="w-full mt-1 hover:bg-gray-300 p-2"
            >
              users
            </Link>
            <Link
              to={`/admin/productList`}
              className="w-full  hover:bg-gray-300 p-2"
            >
              products
            </Link>
            <Link
              to={`/admin/orderList`}
              className="w-full mb-1 hover:bg-gray-300 p-2"
            >
              orders
            </Link>
          </span>
        )}
        <span className="flex flex-col w-full max-w-full py-1 items-start">
          <Link to={`/profile`} className="w-full mt-1 hover:bg-gray-300 p-2">
            profile
          </Link>
          <Link
            to={`/`}
            className="w-full mb-1 hover:bg-gray-300 p-2"
            onClick={onClick}
          >
            logout
          </Link>
        </span>
      </div>
    </div>
  );
};

export default DropDown;
