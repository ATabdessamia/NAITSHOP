import React from "react";
import { Pagination } from "antd";

const Paginate = ({ page, pages }) => {
  console.log(pages);
  return (
    <div className="flex justify-center my-4">
      <Pagination
        defaultCurrent={page}
        total={pages}
        responsive
        simple
        hideOnSinglePage
      />
    </div>
  );
};

export default Paginate;
