/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../actions/userActions";

const Header = () => {
  const [burger, setBurger] = useState(true);
  const [cart, setCart] = useState(false);
  const [sign, setSign] = useState(false);
  const [drop, setDrop] = useState(true);

  const refMd = useRef();
  const refSm = useRef();

  const onBodyClick = (e) => {
    if (refMd.current.contains(e.target) || refSm.current.contains(e.target))
      return;
    setDrop(true);
  };

  useEffect(() => {
    userInfo && document.body.addEventListener("click", onBodyClick);

    return () => {
      userInfo && document.body.removeEventListener("click", onBodyClick);
    };
  }, [onBodyClick]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    setDrop(true);
  };

  const onBurgerHandeler = () => {
    setBurger(!burger);
  };

  const burgerHidden = burger
    ? "transition ease-out duration-100 transform hidden opacity-0 scale-95"
    : "transition ease-out duration-100 transform opacity-100 scale-100";

  const link_cart = cart ? "text-opacity-100" : "text-opacity-80";
  const link_sign = sign ? "text-opacity-100" : "text-opacity-80";

  const dropHidden = drop
    ? "transition ease-out duration-100 transform hidden opacity-0 scale-95"
    : "transition ease-out duration-100 transform opacity-100 scale-100";
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 opacity-60 p-5 shadow-md z-50 relative">
      <nav className="mx-auto md:w-3/4 sm:w-4/5 h-full w-full ">
        <div className="flex justify-between items-center p-2">
          <div className="font-mergim font-black text-2xl text-green-50">
            <Link
              to="/"
              onClick={() => {
                setSign(false);
                setCart(false);
                setDrop(true);
              }}
            >
              NAITSHOP
            </Link>
          </div>
          <div
            className="hidden md:flex itemes-center uppercase font-semibold justify-center"
            ref={refMd}
          >
            <Link
              to="/cart"
              className={`inline-flex mr-2 itemes-center text-green-50 ${link_cart} hover:text-opacity-100`}
              onClick={() => {
                setCart(true);
                setSign(false);
                setDrop(true);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>cart</span>
            </Link>
            {userInfo ? (
              <div className="relative">
                <div
                  className={`inline-flex ml-2 itemes-center text-green-50 ${link_sign} hover:text-opacity-100 cursor-pointer items-center`}
                  onClick={() => {
                    setSign(true);
                    setCart(false);
                    setDrop(!drop);
                  }}
                >
                  <span>{userInfo.name}</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`flex flex-col items-start bg-gray-100 rounded-md w-44 shadow-md absolute top-8 left-2 z-30 py-1 text-sm ${dropHidden}`}
                >
                  <Link
                    to={`/profile`}
                    className="w-full mb-1 hover:bg-gray-300 p-2"
                  >
                    profile
                  </Link>
                  <Link
                    to={`/`}
                    className="w-full mt-1 hover:bg-gray-300 p-2"
                    onClick={logoutHandler}
                  >
                    logout
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`inline-flex ml-2 itemes-center text-green-50 ${link_sign} hover:text-opacity-100`}
                onClick={() => {
                  setSign(true);
                  setCart(false);
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>sign in</span>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button
              className={`p-1 text-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100 transition-transform duration-300 ease-in-out transform hover:scale-110 border border-green-100 bg-green-900`}
              onClick={onBurgerHandeler}
            >
              {burger ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </nav>
      <nav className={`md:hidden ${burgerHidden} mt-5`}>
        <div
          className="uppercase px-2 pt-2 pb-3 space-y-1 flex flex-col items-start justify-center ml-2 sm:ml-20"
          ref={refSm}
        >
          <Link
            to="/cart"
            className={`inline-flex itemes-center text-green-50 mb-2 ${link_cart} hover:text-opacity-100 text-lg`}
            onClick={() => {
              setCart(true);
              setSign(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>cart</span>
          </Link>
          {userInfo ? (
            <div className="relative">
              <div
                className={`inline-flex itemes-center text-green-50 ${link_sign} hover:text-opacity-100 cursor-pointer text-lg items-center`}
                onClick={() => {
                  setSign(true);
                  setCart(false);
                  setDrop(!drop);
                }}
              >
                <span>{userInfo.name}</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`flex flex-col items-start bg-gray-100 rounded-md w-44 shadow-md absolute top-8 left-2 z-30 py-1 text-sm ${dropHidden}`}
              >
                <Link
                  to={`/profile`}
                  className="w-full mb-1 hover:bg-gray-300 p-2"
                >
                  profile
                </Link>
                <Link
                  to={`/`}
                  className="w-full mt-1 hover:bg-gray-300 p-2"
                  onClick={logoutHandler}
                >
                  logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className={`inline-flex itemes-center text-green-50 ${link_sign} hover:text-opacity-100`}
              onClick={() => {
                setSign(true);
                setCart(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>sign in</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
