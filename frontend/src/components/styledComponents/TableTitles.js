import React from "react";

const TableTitles = ({ titles }) => {
  return (
    <tr className="text-gray-600 text-left">
      {titles.map((title) => (
        <th className="font-semibold text-sm uppercase px-3 py-2" key={title}>
          {title}
        </th>
      ))}
      <th className="font-semibold text-sm uppercase px-3 py-2"></th>
    </tr>
  );
};

export default TableTitles;
