import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "antd";

import Loader from "./Loader";
import Message from "./Message";
import Image from "../components/styledComponents/Image";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message
      message={<span className="text-red-900">{error}</span>}
      type="error"
    />
  ) : (
    <Carousel
      autoplay
      className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 shadow-md rounded-sm"
    >
      {products.map((product) => (
        <div key={product._id} className="max-w-full w-full">
          <Link
            to={`/product/${product._id}`}
            className="flex flex-col-reverse items-center justify-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="max-w-full h-80 rounded-full p-2 mx-3 mb-10 align-middle object-center"
            />
            <h2 className="text-base sm:text-xl md:text-2xl uppercase tracking-widest font-extrabold text-green-50 p-2 m-3 text-center">
              {product.name} (${product.price})
            </h2>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
