import React from "react";
import { Pagination } from "antd";

const Paginate = ({
  pageSize,
  total,
  current,
  history,
  keyword,
  isAdmin = false,
}) => {
  if (pageSize === undefined) return null;

  const onPaginate = (page) => {
    history.push(
      !isAdmin
        ? keyword
          ? `/search/${keyword}/page/${page}`
          : `/page/${page}`
        : `/admin/productlist/${page}`
    );
  };

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
