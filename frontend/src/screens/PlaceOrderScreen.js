import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Card from "../components/styledComponents/Card";
import CardButton from "../components/styledComponents/CardButton";
import CardList from "../components/styledComponents/CardList";
import CardListItems from "../components/styledComponents/CardListItems";
import DivideBox from "../components/styledComponents/DivideBox";
import DivideBoxItem from "../components/styledComponents/DivideBoxItem";
import Image from "../components/styledComponents/Image";
import DivideBoxParagraph from "../components/styledComponents/DivideBoxParagraph";
import DivideFlex from "../components/styledComponents/DivideFlex";
import CardGrowItem from "../components/styledComponents/CardGrowItem";
import ItemsDetail from "../components/styledComponents/ItemsDetail";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const toDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = toDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.shippingPrice = toDecimals(cart.itemsPrice > 200 ? 0 : 200);
  cart.taxPrice = toDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps Current="3" History={history} />
      <div className="-mx-3.5 flex flex-wrap">
        <DivideBox>
          <DivideBoxItem title="shipping">
            <DivideBoxParagraph title="address">
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </DivideBoxParagraph>
          </DivideBoxItem>
          <DivideBoxItem title="payment method">
            <DivideBoxParagraph title="method">
              <span>{cart.paymentMethod}</span>
            </DivideBoxParagraph>
          </DivideBoxItem>
          <DivideBoxItem title="order items">
            <div className="divide-y > * divide-gray-900 > * divide-opacity-20">
              {cart.cartItems.length === 0 ? (
                <Message
                  message={
                    <span className="text-blue-900">Your cart is empty</span>
                  }
                  closable
                />
              ) : (
                cart.cartItems.map((item) => (
                  <DivideFlex key={item.product}>
                    <ItemsDetail>
                      <Image src={item.image} alt={item.name} />
                    </ItemsDetail>
                    <ItemsDetail className="flex-grow flex-basis-0 max-w-full mb-2 md:mb-0">
                      <Link
                        to={`/product/${item.product}`}
                        className="hover:underline text-gray-700 text-opacity-90 hover:text-opacity-100"
                      >
                        {item.name}
                      </Link>
                    </ItemsDetail>
                    <ItemsDetail className="px-5 w-full md:w-1/3 md:flex-basis-33 relative mb-2 md:mb-0">
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </ItemsDetail>
                  </DivideFlex>
                ))
              )}
            </div>
          </DivideBoxItem>
        </DivideBox>
        <Card>
          <CardList bordred flexed>
            <CardListItems>
              <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-xl lg:text-2xl font-medium tracking-widest">
                order summary
              </h2>
            </CardListItems>
            <CardListItems capitalize>
              <CardGrowItem title="items" price={cart.itemsPrice} />
            </CardListItems>
            <CardListItems capitalize>
              <CardGrowItem title="shipping" price={cart.shippingPrice} />
            </CardListItems>
            <CardListItems capitalize>
              <CardGrowItem title="tax" price={cart.taxPrice} />
            </CardListItems>
            <CardListItems capitalize>
              <CardGrowItem title="total" price={cart.totalPrice} />
            </CardListItems>
            {error && (
              <div className="">
                <Message
                  message={<span className="text-red-900">{error}</span>}
                  type="error"
                  closable
                />
              </div>
            )}
            <div className="p-3 relative block px-5">
              {cart.cartItems.length === 0 ? (
                <CardButton
                  className="bg-green-900 text-gray-100 uppercase w-full p-3 inline-block text-sm disabled:opacity-50 cursor-default"
                  disabled
                  text="place order"
                />
              ) : (
                <CardButton onClick={placeOrderHandler} text="place order" />
              )}
            </div>
          </CardList>
        </Card>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
