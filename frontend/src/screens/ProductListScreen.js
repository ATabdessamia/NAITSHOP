import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import TableTitles from "../components/styledComponents/TableTitles";
import TableItem from "../components/styledComponents/TableItem";
import Table from "../components/styledComponents/Table";
import SvgButton from "../components/styledComponents/SvgButton";
import DialogBox from "../components/styledComponents/DialogBox";
import { editeSvg } from "../components/styledComponents/Icons";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history }) => {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    setShowDialog(false);
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  const showHandler = () => {
    setShowDialog(true);
  };

  const cancleHandler = () => {
    setShowDialog(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-center mt-10 p-1">
        <div className="flex-grow flex-basis-0 max-w-full">
          <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold">
            products
          </h1>
        </div>
        <div className="flex-grow flex-basis-0 max-w-2xl text-right">
          <SvgButton
            path="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            text="create product"
            className="text-indigo-700 inline-flex items-center p-2 md:p-1 lg:p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 justify-center hover:text-indigo-500 uppercase text-sm sm:text-base"
            onClick={createHandler}
          />
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message
          message={<span className="text-red-900">{errorDelete}</span>}
          type="error"
          closable
        />
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message
          message={<span className="text-red-900">{errorDelete}</span>}
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
        />
      ) : (
        <Table>
          <thead className="bg-gray-50">
            <TableTitles
              titles={["id", "name", "price", "category", "brand"]}
            />
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <TableItem item={product._id} />
                <TableItem item={product.name} />
                <TableItem item={`$${product.price}`} />
                <TableItem item={product.category} />
                <TableItem item={product.brand} />
                <TableItem
                  item={
                    <span className="w-full max-w-full inline-flex items-center">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-blue-700 hover:text-blue-500 p-2 md:p-1 lg:p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 inline-block text-center transition-colors ease-in-out mr-1 rounded-full"
                      >
                        {editeSvg}
                      </Link>
                      {showDialog && (
                        <DialogBox
                          onClick={() => deleteHandler(product._id)}
                          cancle={cancleHandler}
                        />
                      )}
                      <SvgButton
                        onClick={showHandler}
                        className="text-red-700 hover:text-red-500 p-2 md:p-1 lg:p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 inline-block text-center transition-colors ease-in-out ml-1 rounded-full"
                      />
                    </span>
                  }
                />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
