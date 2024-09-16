import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";
import { ExpenseContext } from "../../Store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseDetails = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const { deleteExpense, updateExpense } = useContext(ExpenseContext);
  const location = useLocation();
  const { expense } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [updatedExpense, setUpdatedExpense] = useState(expense);

  const handleChange = (e) => {
    setUpdatedExpense({
      ...updatedExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (id) => {
    updateExpense(id, updatedExpense);
    setIsEditing(false);
    navigate(-1);
  };

  if (!expense) {
    return <div>No expense details available</div>;
  }

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense Deleted successfully!", toastOptions);
    navigate(-1);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-200 py-4 px-2 md:px-4 h-screen overflow-y-auto">
        <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 max-h-[90vh] overflow-y-auto">
          <div className="bg-gray-500 p-4 md:p-6 flex justify-between items-center">
            <p
              onClick={() => navigate(-1)}
              className="text-3xl md:text-5xl text-gray-800"
            >
              <IoCaretBackCircle />
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
              Expense Details
            </h1>
            <div className="hidden md:block">{"     "}</div>{" "}
            {/* Use hidden div to adjust space on mobile */}
          </div>

          {isEditing ? (
            <div className="p-6 md:p-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Name
                </h2>
                <input
                  className="text-gray-800 mt-2 border p-2 w-full"
                  name="ExpenseName"
                  value={updatedExpense.ExpenseName}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Amount
                </h2>
                <input
                  className="font-bold text-gray-800 mt-2 border p-2 w-full"
                  name="ExpenseAmount"
                  value={updatedExpense.ExpenseAmount}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Date
                </h2>
                <input
                  className="text-gray-800 mt-2 border p-2 w-full"
                  type="date"
                  name="ExpenseDate"
                  value={
                    new Date(updatedExpense.ExpenseDate)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  For
                </h2>
                <input
                  type="text"
                  name="ExpenseFor"
                  className="text-gray-800 mt-2 border p-2 w-full"
                  onChange={handleChange}
                  value={updatedExpense.ExpenseFor}
                />
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Type
                </h2>
                <input
                  name="ExpenseType"
                  type="text"
                  className="text-gray-800 mt-2 border p-2 w-full"
                  onChange={handleChange}
                  value={updatedExpense.ExpenseType}
                />
              </div>
              <div className="col-span-1 lg:col-span-3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Description
                </h2>
                <textarea
                  className="text-gray-800 mt-2 border p-2 w-full"
                  name="ExpenseDescription"
                  value={updatedExpense.ExpenseDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Name
                </h2>
                <p className="text-lg md:text-xl text-gray-800 mt-2">
                  {expense.ExpenseName}
                </p>
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Amount
                </h2>
                <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2">
                  ${expense.ExpenseAmount}
                </p>
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Date
                </h2>
                <p className="text-lg md:text-xl text-gray-800 mt-2">
                  {new Date(expense.ExpenseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  For
                </h2>
                <p className="text-lg md:text-xl text-gray-800 mt-2">
                  {expense.ExpenseFor}
                </p>
              </div>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Type
                </h2>
                <p className="text-lg md:text-xl text-gray-800 mt-2 capitalize">
                  {expense.ExpenseType}
                </p>
              </div>
              <div className="col-span-1 lg:col-span-3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-md md:text-lg font-semibold text-gray-500">
                  Description
                </h2>
                <p className="text-lg md:text-xl text-gray-800 mt-2">
                  {expense.ExpenseDescription}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-8 mb-2">
            {isEditing ? (
              <div className="flex items-center justify-between gap-5 pb-5">
                <button
                  className="bg-teal-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onClick={() => handleSave(updatedExpense._id)}
                >
                  Save
                </button>
                <button
                  className="bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onClick={handleEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-5 pb-5">
                <button
                  className="bg-teal-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ExpenseDetails;
