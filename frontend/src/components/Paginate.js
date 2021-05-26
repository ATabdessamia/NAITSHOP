import React from "react";
import { Pagination } from "antd";

const Paginate = ({ page, pageSize, total, onPaginate, current }) => {
  if (pageSize === undefined) return null;
  return (
    <div className="flex justify-center my-4">
      <Pagination
        current={+current}
        total={total}
        pageSize={pageSize}
        responsive
        simple
        onChange={(page) => onPaginate(page)}
        hideOnSinglePage
      />
    </div>
  );
};

export default Paginate;
