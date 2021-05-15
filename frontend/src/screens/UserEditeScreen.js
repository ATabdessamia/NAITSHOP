import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import { getUserDetails } from "../actions/userActions";
import CheckedBox from "../components/styledComponents/CheckedBox";

const initialState = {
  name: "",
  email: "",
  isAdmin: false,
};

const RegisterScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [checked, setchecked] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userId = match.params.id;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      //   dispatch(getUserDetails(userId));
      console.log("h");
    } else {
      setFormData({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [dispatch, user, userId]);

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mt-10">
        <Link
          to="/admin/userList"
          className="bg-green-900 opacity-70 text-green-100 px-3 py-2 ml-1 uppercase transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
        >
          go back
        </Link>
      </div>
      <FormContainer>
        <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold mt-10">
          edite user
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message
            message={<span className="text-red-900">{error}</span>}
            type="error"
            closable
          />
        ) : (
          <form
            className={`${loading && "hidden"} mt-3`}
            onSubmit={(e) => submitHandler(e)}
          >
            <FormInput
              text="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => onChangeValue(e)}
            />
            <FormInput
              text="email address"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => onChangeValue(e)}
            />
            <CheckedBox
              value={formData.isAdmin}
              onChange={(e) => {
                onChangeValue(e);
                setchecked(!checked);
              }}
              checked={checked}
            />
            <FormButton text="update" />
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
