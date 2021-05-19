import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/styledComponents/FormInput";
import FormButton from "../components/styledComponents/FormButton";
import FormFile from "../components/styledComponents/FormFile";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const initialState = {
  name: "",
  price: 0,
  image: "",
  brand: "",
  category: "",
  countInStock: 0,
  description: "",
};

const ProductEditeScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [dispatch, product, productId, successUpdate, history]);

  const onChangeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setFormData({
        image: data,
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: formData.name,
        price: formData.price,
        image: formData.image,
        brand: formData.brand,
        category: formData.category,
        countInStock: formData.countInStock,
        description: formData.description,
      })
    );
  };

  return (
    <>
      <div className="mt-10">
        <Link
          to="/admin/productList"
          className="bg-green-900 opacity-70 text-green-100 px-3 py-2 ml-1 uppercase transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800"
        >
          go back
        </Link>
      </div>
      <FormContainer>
        <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 -ml-1 tracking-widest font-extrabold mt-10">
          edite product
        </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message
            message={<span className="text-red-900">{errorUpdate}</span>}
            type="error"
            closable
          />
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message
            message={<span className="text-red-900">{error}</span>}
            type="error"
            closable
          />
        ) : (
          <form
            className={`${loading && "hidden"} mt-3`}
            onSubmit={(e) => submitHandler(e)}
          >
            <FormInput
              text="name"
              name="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => onChangeValue(e)}
            />
            <FormInput
              text="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => onChangeValue(e)}
            />
            <FormFile
              text="image"
              onChange={uploadFileHandler}
              uploading={uploading && <Loader />}
              value={formData.image}
            />
            <FormInput
              text="brand"
              name="brand"
              type="text"
              placeholder="Enter brand"
              value={formData.brand}
              onChange={(e) => onChangeValue(e)}
            />
            <FormInput
              text="countInStock"
              name="countInStock"
              type="number"
              placeholder="Enter countInStock"
              value={formData.countInStock}
              onChange={(e) => onChangeValue(e)}
            />
            <FormInput
              text="category"
              name="category"
              type="text"
              placeholder="Enter category"
              value={formData.category}
              onChange={(e) => onChangeValue(e)}
            />
            <FormInput
              text="description"
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => onChangeValue(e)}
            />
            <FormButton text="update" />
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditeScreen;
