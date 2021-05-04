import React from "react";
import { Link } from "react-router-dom";

const NavBrand = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick}>
      NAITSHOP
    </Link>
  );
};

export default NavBrand;
