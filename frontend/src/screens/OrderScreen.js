import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const toDecimals = (num) => {
      return Math.round((num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = toDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }

  useEffect(() => {
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
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
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
          <h1 className="text-lg sm:text-2xl md:text-3xl uppercase text-gray-700 p-1 tracking-widest font-extrabold break-words mt-10">
            Order id {order._id}
          </h1>
          <div className="-mx-3.5 flex flex-wrap">
            <div className="px-5 w-full md:w-3/5 md:flex-basis-60 relative">
              <div className="flex flex-col pl-0 divide-y > * divide-gray-900 > * divide-opacity-20 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base my-3 justify-center">
                <div className="py-3 relative block px-5">
                  <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                    shipping
                  </h2>
                  <p className="mb-1">
                    <strong className="font-normal mr-1 capitalize">
                      name:
                    </strong>
                    {order.user.name}
                  </p>
                  <p className="mb-1">
                    <strong className="font-normal mr-1 capitalize">
                      email:
                    </strong>
                    <a
                      href={`mailto:${order.user.email}`}
                      className="hover:underline"
                    >
                      {order.user.email}
                    </a>
                  </p>
                  <p className="mb-1">
                    <strong className="font-normal mr-1 capitalize">
                      address:
                    </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
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
                </div>
                <div className="py-3 relative block px-5">
                  <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                    payment method
                  </h2>
                  <p className="mb-1">
                    <strong className="font-normal mr-1 capitalize">
                      method:
                    </strong>
                    <span>{order.paymentMethod}</span>
                  </p>
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
                </div>
                <div className="py-3 relative block px-5">
                  <h2 className="uppercase text-gray-700 py-2 text-lg sm:text-2xl font-medium tracking-widest">
                    order items
                  </h2>
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
                      <div
                        className="flex flex-col pl-0 mb-3 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base items-center justify-center"
                        key={item.product}
                      >
                        <div className="py-3 relative block px-5 border-b">
                          <div className="-mx-3.5 flex flex-wrap items-center">
                            <div className="px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 -ml-5 md:-ml-0 md:mb-0">
                              <img
                                src={item.image}
                                className="max-w-full h-auto align-middle flex-shrink-0 object-center shadow-sm rounded"
                                alt={item.name}
                              />
                            </div>
                            <div className="flex-grow flex-basis-0 max-w-full mb-2 md:mb-0">
                              <a
                                href="/product/5f859d671d47cbccc8e11f74"
                                className="hover:underline"
                              >
                                {item.name}
                              </a>
                            </div>
                            <div className="px-5 w-full md:w-1/3 md:flex-basis-33 relative mb-2 -ml-5 md:-ml-0 md:mb-0">
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="px-5 w-full md:w-2/5 md:flex-basis-40 relative text-sm sm:text-base md:text-sm lg:text-base break-word bg-clip-border min-w-0 flex flex-col">
              <div className="divide-y > * divide-gray-900 > * divide-opacity-20 border flex flex-col pl-0 mb-0">
                <div className="py-3 relative block px-5">
                  <h2 className="uppercase text-gray-700 py-2 text-2xl font-medium tracking-widest">
                    order summary
                  </h2>
                </div>
                <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
                  <div className="-mx-3.5 flex flex-wrap px-3">
                    <div className="flex-grow flex-basis-0 max-w-full">
                      items
                    </div>
                    <div className="flex-grow flex-basis-0 max-w-full">
                      ${order.itemsPrice}
                    </div>
                  </div>
                </div>
                <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
                  <div className="-mx-3.5 flex flex-wrap px-3">
                    <div className="flex-grow flex-basis-0 max-w-full">
                      shipping
                    </div>
                    <div className="flex-grow flex-basis-0 max-w-full">
                      ${order.shippingPrice}
                    </div>
                  </div>
                </div>
                <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
                  <div className="-mx-3.5 flex flex-wrap px-3">
                    <div className="flex-grow flex-basis-0 max-w-full">tax</div>
                    <div className="flex-grow flex-basis-0 max-w-full">
                      ${order.taxPrice}
                    </div>
                  </div>
                </div>
                <div className="py-3 relative block px-5 text-gray-700 text-opacity-80 capitalize">
                  <div className="-mx-3.5 flex flex-wrap px-3">
                    <div className="flex-grow flex-basis-0 max-w-full">
                      total
                    </div>
                    <div className="flex-grow flex-basis-0 max-w-full">
                      ${order.totalPrice}
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderScreen;
