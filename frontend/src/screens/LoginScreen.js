import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import FormLink from "../components/styledComponents/FormLink";
import { login } from "../actions/userActions";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <FormContainer>
      <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold mt-10">
        sign in
      </h1>
      {error && (
        <Message
          message={<span className="text-red-900">{error}</span>}
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
        <FormButton text="sign in" />
      </form>
      <FormLink
        className={`${loading && "hidden"} py-2 capitalize`}
        question="new customer"
        text="register"
        to={redirect ? `/register?redirect=${redirect}` : "/register"}
      />
    </FormContainer>
  );
};

export default LoginScreen;
