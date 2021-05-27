import React from "react";

const Image = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

Image.defaultProps = {
  className:
    "max-w-full w-full h-auto align-middle flex-shrink-0 object-center shadow-sm rounded",
};

export default Image;
