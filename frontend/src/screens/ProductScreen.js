import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const id = match.params.id;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="mt-10">
      <Link
        to="/"
        className="bg-green-900 opacity-70 text-green-100 px-3 py-2 ml-1 uppercase transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
      >
        go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          message={<span className="text-red-900">{error}</span>}
          type="error"
          closable
        />
      ) : (
        <div className="my-10 -mx-3.5 flex flex-wrap">
          <div className="px-5 w-full md:w-1/2 md:flex-basis-50 relative">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto align-middle flex-shrink-0 object-center shadow-sm"
            />
          </div>
          <div className="px-5 w-full md:w-3/12 md:flex-basis-25 relative">
            <ul className="divide-y > * divide-gray-900 > * divide-opacity-20 text-opacity-70 text-gray-900">
              <li className="py-3 relative block px-5">
                <h3 className="uppercase text-lg sm:text-2xl md:text-xl lg:text-3xl font-medium">
                  {product.name}
                </h3>
              </li>
              <li className="py-3 relative text-sm sm:text-base md:text-sm lg:text-base block px-5 text-gray-700 text-opacity-70">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </li>
              <li className="py-3 relative block px-5 text-sm sm:text-base md:text-sm lg:text-base">
                Price: ${product.price}
              </li>
              <li className="py-3 relative block px-5 text-sm sm:text-base md:text-sm lg:text-base">
                Description: {product.description}
              </li>
            </ul>
          </div>
          <div className="w-full md:w-3/12 md:flex-basis-25 text-sm sm:text-base md:text-sm lg:text-base break-word bg-clip-border px-5 relative min-w-0 flex flex-col">
            <ul className="divide-y > * divide-gray-900 > * divide-opacity-20 border">
              <li className="p-3 flex flex-wrap items-center justify-center">
                <span className="flex-grow max-w-full flex-basis-0">
                  Price:
                </span>
                <span className="flex-grow max-w-full flex-basis-0">
                  <strong>${product.price}</strong>
                </span>
              </li>
              <li className="p-3 flex flex-wrap items-center justify-center">
                <span className="flex-grow max-w-full flex-basis-0">
                  Status:
                </span>
                <span className="flex-grow max-w-full flex-basis-0">
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </span>
              </li>
              {product.countInStock > 0 && (
                <li className="p-3 flex flex-wrap items-center justify-center">
                  <span className="flex-grow max-w-full flex-basis-0">
                    Qty:
                  </span>
                  <select
                    className="flex-grow max-w-full flex-basis-0 p-2 md:p-1 lg:p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 transition-colors ease-in-out"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((q) => (
                      <option key={q + 1} value={q + 1}>
                        {q + 1}
                      </option>
                    ))}
                  </select>
                </li>
              )}

              <li className="p-3 flex flex-wrap items-center justify-center">
                {product.countInStock === 0 ? (
                  <button
                    className="bg-green-900 text-gray-100 uppercase w-full p-3 md:p-1 lg:p-3 inline-block text-sm disabled:opacity-50 cursor-default"
                    type="button"
                    disabled
                  >
                    add to cart
                  </button>
                ) : (
                  <button
                    className="bg-green-900 opacity-90 text-gray-100 uppercase w-full p-3 md:p-1 lg:p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800 hover:opacity-100 inline-block text-sm transition-colors ease-in-out"
                    onClick={addToCartHandler}
                  >
                    add to cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
