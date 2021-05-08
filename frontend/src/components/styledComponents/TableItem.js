import React from "react";

const TableItem = ({ item, mailto, to }) => {
  return (
    <td className="px-3 py-2">
      {item}
      {mailto && (
        <a href={`mailto:${to}`} className="hover:underline">
          {to}
        </a>
      )}
    </td>
  );
};

export default TableItem;
