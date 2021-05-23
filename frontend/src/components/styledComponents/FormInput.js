import React from "react";

const FormInput = ({
  value,
  onChange,
  placeholder,
  text,
  name,
  type,
  required,
  className,
  child,
  textarea,
}) => {
  return (
    <div className={className}>
      <label className="mb-2 inline-block text-gray-700 capitalize ttext-sm sm:text-base md:text-sm lg:text-base">
        {text}
      </label>
      {child ? (
        child
      ) : textarea ? (
        <textarea
          className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out max-h-32 min-h-full"
          rows="3"
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        ></textarea>
      ) : (
        <input
          className="block w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-200 focus:shadow-sm transition-colors ease-in-out input-h"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

FormInput.defaultProps = {
  required: true,
  className: "my-2",
};

export default FormInput;
