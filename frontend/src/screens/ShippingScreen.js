import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [formData, setFormData] = useState({
    cin: shippingAddress.cin,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps Current="1" History={history} />
      <FormContainer>
        <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold my-3">
          shipping
        </h1>
        <form className="mt-3" onSubmit={(e) => submitHandler(e)}>
          <FormInput
            text="cin"
            name="cin"
            type="text"
            placeholder="Enter national identity card"
            value={formData.cin}
            onChange={(e) => onChangeValue(e)}
          />
          <FormInput
            text="address"
            name="address"
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => onChangeValue(e)}
          />
          <FormInput
            text="city"
            name="city"
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => onChangeValue(e)}
          />
          <FormInput
            text="postal code"
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={formData.postalCode}
            onChange={(e) => onChangeValue(e)}
          />
          <FormInput
            text="country"
            type="text"
            name="country"
            placeholder="Enter country"
            value={formData.country}
            onChange={(e) => onChangeValue(e)}
          />
          <FormButton text="continue" />
        </form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
