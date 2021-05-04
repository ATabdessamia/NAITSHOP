import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import FormLink from "../components/styledComponents/FormLink";
import { register } from "../actions/userActions";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(null);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(formData.name, formData.email, formData.password));
    }
  };

  return (
    <FormContainer>
      <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold mt-10">
        sign up
      </h1>
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
      {loading && <Loader />}
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
        <FormInput
          text="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => onChangeValue(e)}
        />
        <FormInput
          text="confirm password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) => onChangeValue(e)}
        />
        <FormButton text="register" />
      </form>
      <FormLink
        className={`${loading && "hidden"} py-2 capitalize`}
        question="have an account"
        text="login"
        to={redirect ? `/login?redirect=${redirect}` : "/login"}
      />
    </FormContainer>
  );
};

export default RegisterScreen;
