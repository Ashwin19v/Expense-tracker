import React, { useContext } from "react";
import { ExpenseContext } from "../Store/Context";

const Profile = () => {
  const { user, expenses, creditedtotal, debitedtotal, logout } =
    useContext(ExpenseContext);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[420px] w-[300px] my-auto">
          <div className="flex items-center justify-center p-4 bg-gray-100">
            <div className="flex items-center justify-center h-[120px] w-[120px] ">
              <img src="git.png" className="rounded-full " />
            </div>

            <div className="text-center flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.username}
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">User ID:</span>
              <span className="font-medium text-gray-800 text-sm">
                {user.id}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Credited Total:</span>
              <span className="font-medium text-gray-800">
                ${creditedtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Debited Total:</span>
              <span className="font-medium text-gray-800">${debitedtotal}</span>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-gray-600">Balance:</span>
              <span className="font-medium text-gray-800">
                ${creditedtotal - debitedtotal}
              </span>
            </div>
            <button
              onClick={logout}
              className="w-full bg-slate-500 rounded-lg h-10 my-12"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
