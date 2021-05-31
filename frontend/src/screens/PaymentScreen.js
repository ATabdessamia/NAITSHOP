import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import FormButton from "../components/styledComponents/FormButton";
import FormRadio from "../components/styledComponents/FormRadio";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [selected, setSelected] = useState();
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
            <FormRadio
              checked={selected === 1}
              value="PayPal"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setSelected(1);
              }}
            />
            <FormRadio
              text="Face To Face"
              id="faceToface"
              value="faceToface"
              checked={selected === 2}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setSelected(2);
              }}
            />
          </div>
          <FormButton text="continue" />
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
