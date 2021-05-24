import React, { useState } from "react";

import FormButton from "./styledComponents/FormButton";

const SearchBox = ({ history, responsive }) => {
  const [keyword, setKeyword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form
      className={`md:text-xs items-center shadow-sm overflow-hidden ${responsive} ml-4 md:ml-0`}
      onSubmit={onSubmitHandler}
    >
      <input
        className="font-normal text-green-900 bg-gray-100 bg-clip-padding border-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 transition-colors ease-in-out p-2 rounded-tl rounded-bl"
        name="q"
        type="text"
        placeholder="Search Products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <FormButton
        text="search"
        className="bg-green-900 opacity-90 text-green-50 uppercase p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 hover:opacity-100 inline-block text-center transition-colors ease-in-out rounded-tr rounded-br"
      />
    </form>
  );
};

export default SearchBox;
