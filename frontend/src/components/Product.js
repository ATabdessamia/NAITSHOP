import React from "react";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="border p-3 rounded-sm shadow-sm text-gray-700 break-word bg-clip-border">
      <div className="mb-3">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full align-middle flex-shrink-0 object-center"
          />
        </Link>
      </div>

      <div className="px-3 my-2">
        <Link
          to={`/product/${product._id}`}
          className="hover:underline hover:text-gray-900 font-light"
        >
          <strong>{product.name}</strong>
        </Link>
      </div>

      <div className="px-3 text-gray-700 text-opacity-70">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>

      <h3 className="text-lg sm:text-xl px-3 my-2 font-semibold">
        ${product.price}
      </h3>
    </div>
  );
};

export default Product;
