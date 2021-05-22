/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import TableTitles from "../components/styledComponents/TableTitles";
import TableItem from "../components/styledComponents/TableItem";
import Table from "../components/styledComponents/Table";
import { XSvg } from "../components/styledComponents/Icons";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(null);
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
        dispatch(getUserDetails("profile"));
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
          <FormInput
            text="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name || ""}
            onChange={(e) => onChangeValue(e)}
            className="mb-1"
            required={Boolean(false)}
          />
          <FormInput
            text="email address"
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email || ""}
            onChange={(e) => onChangeValue(e)}
            className="mb-1"
            required={Boolean(false)}
          />
          <FormInput
            text="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password || ""}
            onChange={(e) => onChangeValue(e)}
            className="mb-1"
            required={Boolean(false)}
          />
          <FormInput
            text="confirm password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword || ""}
            onChange={(e) => onChangeValue(e)}
            className="mb-1"
            required={Boolean(false)}
          />
          <FormButton text="update" />
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
          <Table>
            <thead className="bg-gray-50">
              <TableTitles
                titles={["id", "date", "total", "paid", "delivered"]}
              />
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <TableItem item={order._id} />
                  <TableItem item={order.createdAt.substring(0, 10)} />
                  <TableItem item={`$${order.totalPrice}`} />
                  <TableItem
                    item={order.isPaid ? order.paidAt.substring(0, 10) : XSvg}
                  />
                  <TableItem
                    item={
                      order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : XSvg
                    }
                  />
                  <TableItem
                    item={
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-700 opacity-80 text-gray-100 uppercase px-4 py-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 hover:opacity-100 inline-block text-center transition-colors ease-in-out"
                      >
                        details
                      </Link>
                    }
                  />
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
