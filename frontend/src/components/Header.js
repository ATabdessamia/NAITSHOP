/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BurgerMenu from "./styledComponents/BurgerMenu";
import DropDown from "./styledComponents/DropDown";
import NavBrand from "./styledComponents/NavBrand";
import NavLinks from "./styledComponents/NavLinks";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const [burger, setBurger] = useState(true);
  const [cart, setCart] = useState(false);
  const [sign, setSign] = useState(false);
  const [drop, setDrop] = useState(true);
  const refMd = useRef();
  const refSm = useRef();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    <header className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-5 shadow-md z-50 relative">
      <nav className="mx-auto md:w-3/4 sm:w-4/5 h-full w-full">
        <div className="flex justify-between items-center p-2">
          <div className="font-mergim font-black text-2xl text-green-50">
            <NavBrand
              onClick={() => {
                setSign(false);
                setCart(false);
                setDrop(true);
              }}
            />
          </div>
          <div
            className="hidden md:flex itemes-center uppercase font-semibold justify-center"
            ref={refMd}
          >
            <NavLinks
              to="/cart"
              className={`inline-flex mr-2 itemes-center text-green-50 ${link_cart} hover:text-opacity-100`}
              onClick={() => {
                setCart(true);
                setSign(false);
                setDrop(true);
              }}
              text="cart"
              svg="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />

            {userInfo ? (
              <DropDown
                className={`inline-flex ml-2 itemes-center text-green-50 ${link_sign} hover:text-opacity-100 cursor-pointer items-center`}
                dropDown={() => {
                  setSign(true);
                  setCart(false);
                  setDrop(!drop);
                }}
                isAdmin={userInfo && userInfo.isAdmin && true}
                dropHidden={dropHidden}
                text={userInfo.name}
                onClick={logoutHandler}
              />
            ) : (
              <NavLinks
                to="/login"
                className={`inline-flex ml-2 itemes-center text-green-50 ${link_sign} hover:text-opacity-100`}
                onClick={() => {
                  setSign(true);
                  setCart(false);
                }}
                text="sign in"
                svg="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              />
            )}
          </div>
          <div className="md:hidden">
            <BurgerMenu onClick={onBurgerHandeler} burger={burger} />
          </div>
        </div>
      </nav>
      <nav className={`md:hidden ${burgerHidden} mt-5`}>
        <div
          className="uppercase px-2 pt-2 pb-3 space-y-1 flex flex-col items-start justify-center ml-2 sm:ml-20"
          ref={refSm}
        >
          <NavLinks
            to="/cart"
            className={`inline-flex itemes-center text-green-50 mb-2 ${link_cart} hover:text-opacity-100 text-lg`}
            onClick={() => {
              setCart(true);
              setSign(false);
            }}
            text="cart"
            svg="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          />

          {userInfo ? (
            <DropDown
              className={`inline-flex itemes-center text-green-50 ${link_sign} hover:text-opacity-100 cursor-pointer text-lg items-center`}
              dropDown={() => {
                setSign(true);
                setCart(false);
                setDrop(!drop);
              }}
              isAdmin={userInfo && userInfo.isAdmin && true}
              dropHidden={dropHidden}
              text={userInfo.name}
              onClick={logoutHandler}
            />
          ) : (
            <NavLinks
              to="/login"
              className={`inline-flex itemes-center text-green-50 ${link_sign} hover:text-opacity-100`}
              onClick={() => {
                setSign(true);
                setCart(false);
              }}
              text="sign in"
              svg="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
