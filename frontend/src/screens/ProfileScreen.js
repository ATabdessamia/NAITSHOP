/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const ProfileScreen = ({ location, history }) => {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setFormData({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [dispatch, history, userInfo, user]);

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };
  return (
    <div className="mt-10 -mx-3.5 flex flex-wrap">
      <div className="px-5 md:px-2 lg:px-5 w-full md:w-1/4 md:flex-basis-25 relative">
        <h2 className="text-lg sm:text-3xl md:text-2xl xl:text-3xl uppercase text-gray-700 p-1 tracking-widest font-extrabold">
          user profile
        </h2>
        {error && (
          <Message
            message={<span className="text-red-900">{error}</span>}
            type="error"
            closable
          />
        )}
        {message && (
          <Message
            message={<span className="text-red-900">{message}</span>}
            type="error"
            closable
          />
        )}
        {success && (
          <Message
            message={<span className="text-green-900">Profile updated</span>}
            type="success"
            closable
          />
        )}
        {loading && <Loader />}
        <form className="p-1" onSubmit={(e) => submitHandler(e)}>
          <div className="mb-1">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              name
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name || ""}
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="mb-1">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              email address
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="mb-1">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              password
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password || ""}
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <div className="mb-1">
            <label className="mb-2 inline-block text-gray-700 capitalize text-sm sm:text-base md:text-sm lg:text-base">
              confirm password
            </label>
            <input
              className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword || ""}
              onChange={(e) => onChangeValue(e)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-900 opacity-90 text-green-100 uppercase px-6 py-3 md:py-2 md:px-4 lg:py-3 lg:px-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200 hover:opacity-100 inline-block text-sm my-2 text-center transition-colors ease-in-out"
          >
            update
          </button>
        </form>
      </div>
      <div className="px-5 md:px-2 lg:px-5 w-full md:w-3/4 md:flex-basis-75 relative">
        <h2 className="text-lg sm:text-3xl md:text-2xl xl:text-3xl uppercase text-gray-700 p-1 tracking-widest font-extrabold">
          my orders
        </h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message
            message={<span className="text-red-900">{error}</span>}
            type="error"
            closable
          />
        ) : (
          <div className="overflow-x-auto w-full mt-3 text-sm xl:text-base">
            <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-sm bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-3 py-2">
                    ID
                  </th>
                  <th className="font-semibold text-sm uppercase px-3 py-2">
                    DATE
                  </th>
                  <th className="font-semibold text-sm uppercase px-3 py-2">
                    TOTAL
                  </th>
                  <th className="font-semibold text-sm uppercase px-3 py-2">
                    PAID
                  </th>
                  <th className="font-semibold text-sm uppercase px-3 py-2">
                    DELIVERED
                  </th>
                  <th className="font-semibold text-sm uppercase px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="px-3 py-2">{order._id}</td>
                    <td className="px-3 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-3 py-2">{order.totalPrice}</td>
                    <td className="px-3 py-2">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <span className="text-red-500">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <span className="text-red-500">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-700 opacity-80 text-gray-100 uppercase px-4 py-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 hover:opacity-100 inline-block text-center transition-colors ease-in-out"
                      >
                        details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
