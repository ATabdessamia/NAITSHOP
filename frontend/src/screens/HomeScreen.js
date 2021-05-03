import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold mt-10">
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
    </>
  );
};

export default HomeScreen;
