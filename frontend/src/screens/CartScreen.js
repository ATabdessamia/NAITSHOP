import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ history, match, location }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  const id = match.params.id;
  const qty = location.search ? +location.search.split("=")[1] : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="mt-10 -mx-3.5 flex flex-wrap">
      <div className="px-5 w-full md:w-3/5 md:flex-basis-60 relative">
        <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold">
          shopping cart
        </h1>
        {cartItems.length === 0 ? (
          <Message
            message={
              <div className="flex justify-between items-center">
                <span className="text-blue-900">Your cart is empty</span>
                <Link to="/" className="hover:underline capitalize">
                  go back
                </Link>
              </div>
            }
          />
        ) : (
          <div className="flex flex-col pl-0 divide-y > * divide-gray-900 > * divide-opacity-20 text-opacity-70 text-gray-900 text-xs sm:text-base  md:text-xs lg:text-base my-3 justify-center">
            {cartItems.map((item) => (
              <div key={item.product} className="py-3 relative block px-5">
                <div className="-mx-3.5 flex flex-wrap items-center">
                  <div className="px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full h-auto align-middle flex-shrink-0 object-center shadow-sm rounded"
                    />
                  </div>
                  <div className="px-5 w-full md:w-2/6 md:flex-basis-33 relative mb-2 md:mb-0">
                    <Link
                      to={`/product/${item.product}`}
                      className="hover:underline text-gray-700 text-opacity-90 hover:text-opacity-100"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0">
                    ${item.price}
                  </div>
                  <div className="px-5 md:px-2 lg:px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0">
                    <select
                      className="flex-grow w-full max-w-full flex-basis-0 p-2 md:p-1 lg:p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 transition-colors ease-in-out"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0">
                    <button
                      className="text-red-700 flex-basis-0 inline-flex flex-grow max-w-full w-full p-2 md:p-1 lg:p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 justify-center hover:text-red-500"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-5 w-full md:w-2/5 md:flex-basis-40 relative md:text-sm text-base lg:text-base break-word bg-clip-border min-w-0 flex flex-col">
        <ul className="divide-y > * divide-gray-900 > * divide-opacity-20 border">
          <li className="p-3 flex flex-wrap items-center text-gray-900 text-opacity-70">
            <h2 className="text-lg sm:text-3xl md:text-2xl lg:text-3xl uppercase text-gray-700 text-opacity-90 mr-2">
              subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){" "}
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </li>
          <li className="p-3 flex flex-wrap items-center justify-center">
            {cartItems.length === 0 ? (
              <button
                className="bg-green-900 text-gray-100 uppercase w-full p-3 inline-block text-sm disabled:opacity-50 cursor-default"
                disabled
              >
                proceed to checkout
              </button>
            ) : (
              <button
                className="bg-green-900 opacity-90 text-gray-100 uppercase w-full p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm transition-colors ease-in-out"
                onClick={checkoutHandler}
              >
                proceed to checkout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartScreen;
