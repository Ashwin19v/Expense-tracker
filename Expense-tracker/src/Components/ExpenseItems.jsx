import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";

const ExpenseItems = ({ Expenses }) => {
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSortedExpenses(Expenses);
  }, [Expenses]);

  function viewDetails(expense) {
    navigate("/details", { state: { expense } });
  }

  function sortByName() {
    const sorted = [...sortedExpenses].sort((a, b) =>
      a.ExpenseName.localeCompare(b.ExpenseName)
    );
    setSortedExpenses(sorted);
  }

  function sortByAmount() {
    const sorted = [...sortedExpenses].sort(
      (a, b) => a.ExpenseAmount - b.ExpenseAmount
    );
    setSortedExpenses(sorted);
  }

  function sortByDate() {
    const sorted = [...sortedExpenses].sort(
      (a, b) => new Date(a.ExpenseDate) - new Date(b.ExpenseDate)
    );
    setSortedExpenses(sorted);
  }

  if (sortedExpenses.length === 0) {
    return (
      <div className="w-full lg:w-3/4 mx-auto my-8 bg-white rounded-lg shadow-lg p-4 text-center">
        <p className="text-gray-500">No expenses available</p>
      </div>
    );
  }

  return (
    <div className=" w-3/4 lg:w-3/4  mx-auto my-8 bg-white rounded-lg shadow-lg overflow-x-auto max-h-[550px]">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700">Index</th>
            <th
              className="py-2 px-4 text-left text-gray-700 cursor-pointer"
              onClick={sortByName}
            >
              Name
            </th>
            <th
              className="py-2 px-4 text-left text-gray-700 cursor-pointer"
              onClick={sortByAmount}
            >
              Amount
            </th>
            <th
              className="py-2 px-4 text-left text-gray-700 cursor-pointer"
              onClick={sortByDate}
            >
              Date
            </th>
            <th className="py-2 px-4 text-left text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-5 px-4 border-b border-gray-200 flex align-center justify-start gap-3">
                {index}
                {expense.ExpenseType === "credited" ? (
                  <FaPlus className="text-green-500 text-lg mt-1" />
                ) : (
                  <FaMinus className="text-red-600 text-lg mt-1" />
                )}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <p>{expense.ExpenseName}</p>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${expense.ExpenseAmount}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {new Date(expense.ExpenseDate).toLocaleDateString()}
              </td>
              <td
                className="py-2 px-4 border-b border-gray-200 text-2xl cursor-pointer"
                onClick={() => viewDetails(expense)}
              >
                <IoMdArrowDropdown />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseItems;
