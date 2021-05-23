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
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successProductReview, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
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
        <>
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
                    text={
                      product.countInStock > 0 ? "In Stock" : "Out Of Stock"
                    }
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
          <div className="my-10 -mx-3.5 flex flex-wrap">
            <Card className="px-5 w-full md:w-1/2 md:flex-basis-50 relative">
              <h2 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold">
                Reviews
              </h2>
              {product.reviews.length === 0 && (
                <Message
                  message={<span className="text-blue-900">No Reviews</span>}
                />
              )}
              <CardList>
                {product.reviews.map((review) => (
                  <CardListItems key={review._id}>
                    <strong>{review.name}</strong>
                    <p className="flex items-center flex-wrap text-sm text-gray-700 text-opacity-70">
                      <Rating value={review.rating} />
                      <span className="ml-1">
                        {review.createdAt.substring(0, 10)}
                      </span>
                    </p>
                    <p className="my-2 p-1">{review.comment}</p>
                  </CardListItems>
                ))}
                <CardListItems>
                  <h3 className="text-base sm:text-lg uppercase text-gray-700 tracking-widest font-extrabold">
                    Write a Customer Review
                  </h3>
                  {successProductReview && (
                    <Message
                      message={
                        <span className="text-green-900">
                          Review submitted successfully
                        </span>
                      }
                      type="success"
                      closable
                    />
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message
                      message={
                        <span className="text-red-900">
                          {errorProductReview}
                        </span>
                      }
                      type="error"
                      closable
                    />
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <FormInput
                        text="rating"
                        child={
                          <Select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            opRate
                          />
                        }
                      />
                      <FormInput
                        text="comment"
                        placeholder="Type here..."
                        textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <FormButton text="submit" />
                    </form>
                  ) : (
                    <Message
                      message={
                        <div className="flex items-center">
                          <span className="text-blue-900 mr-1">Please</span>
                          <Link
                            to="/login"
                            className="hover:underline capitalize"
                          >
                            sign in
                          </Link>
                          <span className="text-blue-900 ml-1">
                            to write a review
                          </span>
                        </div>
                      }
                    />
                  )}
                </CardListItems>
              </CardList>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
