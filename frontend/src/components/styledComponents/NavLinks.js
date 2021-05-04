import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ to, text, svg, className, onClick }) => {
  return (
    <Link to={to} className={className} onClick={onClick}>
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d={svg} />
      </svg>
      <span>{text}</span>
    </Link>
  );
};

export default NavLinks;
