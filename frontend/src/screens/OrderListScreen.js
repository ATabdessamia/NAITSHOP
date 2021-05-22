import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import TableTitles from "../components/styledComponents/TableTitles";
import TableItem from "../components/styledComponents/TableItem";
import Table from "../components/styledComponents/Table";
import { XSvg } from "../components/styledComponents/Icons";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold mt-10">
        orders
      </h1>
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
              titles={["id", "user", "date", "total", "paid", "delivered"]}
            />
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <TableItem item={order._id} />
                <TableItem item={order.user && order.user.name} />
                <TableItem item={order.createdAt.substring(0, 10)} />
                <TableItem item={`$${order.totalPrice}`} />
                <TableItem
                  item={order.isPaid ? order.paidAt.substring(0, 10) : XSvg}
                />
                <TableItem
                  item={
                    order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : XSvg
                  }
                />
                <TableItem
                  item={
                    <span className="w-full max-w-full inline-flex items-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-blue-700 opacity-80 text-gray-100 uppercase px-4 py-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 hover:opacity-100 inline-block text-center transition-colors ease-in-out"
                      >
                        details
                      </Link>
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

export default OrderListScreen;
