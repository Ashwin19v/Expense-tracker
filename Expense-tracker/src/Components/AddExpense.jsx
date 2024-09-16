import React, { useState, useContext } from "react";
import { ExpenseContext } from "../Store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddExpense = ({ handlePopup }) => {
  const [ExpenseName, setExpenseName] = useState("");
  const [ExpenseAmount, setExpenseAmount] = useState("");
  const [ExpenseType, setExpenseType] = useState("");
  const [ExpenseDescription, setExpenseDescription] = useState("");
  const [ExpenseDate, setExpenseDate] = useState("");
  const [ExpenseFor, setExpenseFor] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { addToExpense } = useContext(ExpenseContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const expense = {
      ExpenseAmount,
      ExpenseDate,
      ExpenseDescription,
      ExpenseFor,
      ExpenseName,
      ExpenseType,
    };
    addToExpense(expense);
    toast.success("Expense Added successfully!", toastOptions);
    handlePopup();
  }

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

        <div
          className="fixed inset-0 flex items-center justify-center z-20"
          onClick={handlePopup}
        >
          <div className="w-full max-w-sm bg-slate-200 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
            <form
              className="flex flex-col w-full px-4 space-y-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Expense
              </h2>

              <input
                type="text"
                placeholder="Enter the expense name"
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setExpenseName(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Enter the price $"
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setExpenseAmount(e.target.value)}
                required
              />

              <div className="flex justify-between items-center w-full space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="credited"
                    value="credited"
                    name="transactionType"
                    className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                  <label htmlFor="credited" className="text-sm text-gray-700">
                    Credited
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="debited"
                    value="debited"
                    name="transactionType"
                    className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                  <label htmlFor="debited" className="text-sm text-gray-700">
                    Debited
                  </label>
                </div>
              </div>

              <textarea
                placeholder="Enter the expense description"
                onChange={(e) => setExpenseDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="w-full flex items-center justify-between gap-4">
                <input
                  required
                  type="text"
                  placeholder="Expense for"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setExpenseFor(e.target.value)}
                />
                <input
                  required
                  type="date"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setExpenseDate(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
