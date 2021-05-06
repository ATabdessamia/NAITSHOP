import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Select from "../components/styledComponents/Select";
import Card from "../components/styledComponents/Card";
import CardButton from "../components/styledComponents/CardButton";
import Image from "../components/styledComponents/Image";
import CardList from "../components/styledComponents/CardList";
import CardListItems from "../components/styledComponents/CardListItems";
import CardSpan from "../components/styledComponents/CardSpan";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const id = match.params.id;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="mt-10">
      <Link
        to="/"
        className="bg-green-900 opacity-70 text-green-100 px-3 py-2 ml-1 uppercase transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
      >
        go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message
          message={<span className="text-red-900">{error}</span>}
          type="error"
          closable
        />
      ) : (
        <div className="my-10 -mx-3.5 flex flex-wrap">
          <Card className="px-5 w-full md:w-1/2 md:flex-basis-50 relative">
            <Image src={product.image} alt={product.name} />
          </Card>
          <Card className="px-5 w-full md:w-3/12 md:flex-basis-25 relative">
            <CardList>
              <li className="py-3 relative block px-5">
                <h3 className="uppercase text-lg sm:text-2xl md:text-xl lg:text-3xl font-medium">
                  {product.name}
                </h3>
              </li>
              <li className="py-3 relative text-sm sm:text-base md:text-sm lg:text-base block px-5 text-gray-700 text-opacity-70">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </li>
              <li className="py-3 relative block px-5 text-sm sm:text-base md:text-sm lg:text-base">
                Price: ${product.price}
              </li>
              <li className="py-3 relative block px-5 text-sm sm:text-base md:text-sm lg:text-base">
                Description: {product.description}
              </li>
            </CardList>
          </Card>
          <Card className="w-full md:w-3/12 md:flex-basis-25 text-sm sm:text-base md:text-sm lg:text-base break-word bg-clip-border px-5 relative min-w-0 flex flex-col">
            <CardList bordred>
              <CardListItems flexed>
                <CardSpan text="Price:" />
                <CardSpan strong={product.price} />
              </CardListItems>
              <CardListItems flexed>
                <CardSpan text="Status:" />
                <CardSpan
                  text={product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                />
              </CardListItems>
              {product.countInStock > 0 && (
                <CardListItems flexed>
                  <CardSpan text="Qty:" />
                  <Select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    countItem={product}
                  />
                </CardListItems>
              )}

              <CardListItems flexed>
                {product.countInStock === 0 ? (
                  <CardButton
                    className="bg-green-900 text-gray-100 uppercase w-full p-3 md:p-1 lg:p-3 inline-block text-xs sm:text-sm md:text-xs lg:text-sm disabled:opacity-50 cursor-default"
                    text="add to cart"
                    disabled
                  />
                ) : (
                  <CardButton
                    className="bg-green-900 opacity-90 text-gray-100 uppercase w-full p-3 md:p-1 lg:p-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800 hover:opacity-100 inline-block text-xs sm:text-sm md:text-xs lg:text-sm transition-colors ease-in-out"
                    onClick={addToCartHandler}
                    text="add to cart"
                  />
                )}
              </CardListItems>
            </CardList>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
