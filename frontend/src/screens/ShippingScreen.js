import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [formData, setFormData] = useState({
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
          <div className="my-2">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              address
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              name="address"
              type="text"
              placeholder="Enter address"
              value={formData.address}
              required
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="my-2">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              city
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              required
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="my-2">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              postal code
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
              value={formData.postalCode}
              required
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="my-2">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              country
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              required
              onChange={(e) => onChangeValue(e)}
            />
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

export default ShippingScreen;
