import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Card from "../components/styledComponents/Card";
import CardButton from "../components/styledComponents/CardButton";
import Image from "../components/styledComponents/Image";
import ItemsDetail from "../components/styledComponents/ItemsDetail";
import Select from "../components/styledComponents/Select";
import SvgButton from "../components/styledComponents/SvgButton";
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
                  <ItemsDetail>
                    <Image src={item.image} alt={item.name} />
                  </ItemsDetail>
                  <ItemsDetail className="px-5 w-full md:w-2/6 md:flex-basis-33 relative mb-2 md:mb-0">
                    <Link
                      to={`/product/${item.product}`}
                      className="hover:underline text-gray-700 text-opacity-90 hover:text-opacity-100"
                    >
                      {item.name}
                    </Link>
                  </ItemsDetail>
                  <ItemsDetail>${item.price}</ItemsDetail>
                  <ItemsDetail className="px-5 md:px-2 lg:px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0">
                    <Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                      countItem={item}
                    />
                  </ItemsDetail>
                  <ItemsDetail>
                    <SvgButton
                      onClick={() => removeFromCartHandler(item.product)}
                    />
                  </ItemsDetail>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Card>
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
              <CardButton
                className="bg-green-900 text-gray-100 uppercase w-full p-3 inline-block text-sm disabled:opacity-50 cursor-default"
                disabled
                text="proceed to checkout"
              />
            ) : (
              <CardButton
                onClick={checkoutHandler}
                text="proceed to checkout"
              />
            )}
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default CartScreen;
