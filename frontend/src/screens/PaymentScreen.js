import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) history.push("/shipping");

  useEffect(() => {
    setSelected(1);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <CheckoutSteps Current="2" History={history} />
      <FormContainer>
        <h1 className="text-xl sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold my-3">
          payment method
        </h1>
        <form className="mt-3" onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col my-2">
            <h3 className="capitalize text-lg sm:text-xl md:text-2xl text-gray-700 p-1 -ml-1 tracking-widest font-medium text-opacity-80">
              select method
            </h3>
            <label className="inline-flex items-center ml-5">
              <input
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                id="PayPal"
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={selected === 1}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setSelected(1);
                }}
              />
              <span className="ml-2 text-gray-800">PayPal or Credit Card</span>
            </label>
            <label className="inline-flex items-center ml-5">
              <input
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                id="faceToface"
                type="radio"
                name="paymentMethod"
                value="faceToface"
                checked={selected === 2}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setSelected(2);
                }}
              />
              <span className="ml-2 text-gray-800">Face To Face</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-900 opacity-90 text-green-100 uppercase px-6 py-3 md:py-2 md:px-4 lg:py-3 lg:px-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm my-2 text-center transition-colors ease-in-out"
          >
            continue
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
