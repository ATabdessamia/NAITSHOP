import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageSize, total } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className="my-10">
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link
            to="/"
            className="bg-green-900 opacity-70 text-green-100 px-3 py-2 ml-1 uppercase transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
          >
            go back
          </Link>
        )}
      </div>
      <h1 className="text-xl sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold mt-10">
        latest products
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          message={<span className="text-red-900">{error}</span>}
          type="error"
          closable
        />
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-5 p-1"
        >
          {products.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
        </div>
      )}
      <Paginate
        current={pageNumber}
        pageSize={pageSize}
        total={total}
        keyword={keyword ? keyword : ""}
        history={history}
      />
    </>
  );
};

export default HomeScreen;
