import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import TableTitles from "../components/styledComponents/TableTitles";
import TableItem from "../components/styledComponents/TableItem";
import Table from "../components/styledComponents/Table";
import { deleteUser, listUsers } from "../actions/userActions";
import SvgButton from "../components/styledComponents/SvgButton";
import { checkSvg, editeSvg, XSvg } from "../components/styledComponents/Icons";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1 className="text-lg sm:text-3xl md:text-4xl uppercase text-gray-700 p-1 tracking-widest font-extrabold mt-10">
        users
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
            <TableTitles titles={["id", "name", "email", "admin"]} />
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <TableItem item={user._id} />
                <TableItem item={user.name} />
                <TableItem mailto to={user.email} />
                <TableItem item={user.isAdmin ? checkSvg : XSvg} />
                <TableItem
                  item={
                    <span className="w-full max-w-full inline-flex items-center">
                      <Link
                        to={`/user/${user._id}/edite`}
                        className="text-blue-700 hover:text-blue-500 p-2 md:p-1 lg:p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 inline-block text-center transition-colors ease-in-out mr-1 rounded-full"
                      >
                        {editeSvg}
                      </Link>
                      <SvgButton
                        onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
