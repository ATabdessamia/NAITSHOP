import React from "react";

const DialogBox = () => {
  return (
    <div className="bg-red-400 w-96 absolute left-1/2 top-1/4 -translate-x-1/2  p-5 flex flex-col text-gray-100 z-50 shadow-lg rounded">
      <span className="capitalize my-2 text-lg sm:text-3xl">are you sure?</span>
      <span className="flex justify-between items-center my-2">
        <button className="hover:bg-gray-100 bg-gray-50 p-2 md:p-1 lg:p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 inline-block text-center transition-colors ease-in-out rounded text-gray-700">
          cancle
        </button>
        <button className="hover:bg-gray-100 bg-gray-50 p-2 md:p-1 lg:p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 inline-block text-center transition-colors ease-in-out rounded text-gray-700">
          ok
        </button>
      </span>
    </div>
  );
};

export default DialogBox;
