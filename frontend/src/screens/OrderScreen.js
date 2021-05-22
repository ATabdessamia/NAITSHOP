import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Card from "../components/styledComponents/Card";
import DivideBox from "../components/styledComponents/DivideBox";
import DivideBoxItem from "../components/styledComponents/DivideBoxItem";
import Image from "../components/styledComponents/Image";
import DivideBoxParagraph from "../components/styledComponents/DivideBoxParagraph";
import DivideFlex from "../components/styledComponents/DivideFlex";
import CardList from "../components/styledComponents/CardList";
import CardListItems from "../components/styledComponents/CardListItems";
import CardGrowItem from "../components/styledComponents/CardGrowItem";
import ItemsDetail from "../components/styledComponents/ItemsDetail";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import CardButton from "../components/styledComponents/CardButton";

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const toDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = toDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          message={<span className="text-red-900">{error}</span>}
          type="error"
          closable
        />
      ) : (
        <>
          <h1 className="text-lg sm:text-2xl md:text-3xl uppercase text-gray-700 p-1 tracking-widest font-extrabold break-words mt-10 md:my-10">
            Order id {order._id}
          </h1>
          <div className="-mx-3.5 flex flex-wrap">
            <DivideBox>
              <DivideBoxItem title="shipping">
                <DivideBoxParagraph title="name">
                  {order.user.name}
                </DivideBoxParagraph>
                <DivideBoxParagraph title="email">
                  <a
                    href={`mailto:${order.user.email}`}
                    className="hover:underline"
                  >
                    {order.user.email}
                  </a>
                </DivideBoxParagraph>
                <DivideBoxParagraph title="address">
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </DivideBoxParagraph>
                {order.isDelivered ? (
                  <Message
                    message={
                      <span className="text-green-900">
                        Paid on {order.deliveredAt}
                      </span>
                    }
                    type="success"
                  />
                ) : (
                  <Message
                    message={
                      <span className="text-red-900">Not Delivered</span>
                    }
                    type="error"
                  />
                )}
              </DivideBoxItem>
              <DivideBoxItem title="payment method">
                <DivideBoxParagraph title="method">
                  <span>{order.paymentMethod}</span>
                </DivideBoxParagraph>
                {order.isPaid ? (
                  <Message
                    message={
                      <span className="text-green-900">
                        Paid on {order.paidAt}
                      </span>
                    }
                    type="success"
                  />
                ) : (
                  <Message
                    message={<span className="text-red-900">Not Paid</span>}
                    type="error"
                  />
                )}
              </DivideBoxItem>
              <DivideBoxItem title="order items">
                <div className="divide-y > * divide-gray-900 > * divide-opacity-20">
                  {order.orderItems.length === 0 ? (
                    <Message
                      message={
                        <span className="text-blue-900">
                          Your cart is empty
                        </span>
                      }
                      closable
                    />
                  ) : (
                    order.orderItems.map((item) => (
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
                  <CardGrowItem title="items" price={order.itemsPrice} />
                </CardListItems>
                <CardListItems capitalize>
                  <CardGrowItem title="shipping" price={order.shippingPrice} />
                </CardListItems>
                <CardListItems capitalize>
                  <CardGrowItem title="tax" price={order.taxPrice} />
                </CardListItems>
                <CardListItems capitalize>
                  <CardGrowItem title="total" price={order.totalPrice} />
                </CardListItems>
                {!order.isPaid && (
                  <div className="py-3 relative block px-5">
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="py-3 relative block px-5">
                      <CardButton
                        onClick={deliverHandler}
                        text="mark as delivered"
                      />
                    </div>
                  )}
              </CardList>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;
