import React, { useState, useContext, useEffect } from "react";
import { IoCaretBackCircle } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddExpense from "../../Components/AddExpense";
import { ExpenseContext } from "../../Store/Context";
import { ToastContainer, toast } from "react-toastify";
import ExpenseItems from "../../Components/ExpenseItems";
const CreditedExpense = () => {
  const navigate = useNavigate();
  const [addExpense, setAddExpense] = useState(false);
  const { expenses } = useContext(ExpenseContext);

  const creditedExpenses = expenses.filter(
    (expense) => expense.ExpenseType === "credited"
  );

  function handlePopup() {
    setAddExpense(!addExpense);
  }

  return (
    <>
      <div>
        <div className="w-3/4 h-[50px] bg-slate-600 mt-12 flex justify-between items-center mx-auto p-4 text-2xl  font-bold text-white">
          <p onClick={() => navigate(-1)}>
            <IoCaretBackCircle />
          </p>
          <h2>Credited Expenses</h2>
          <p onClick={handlePopup}>
            <FaPlusCircle />
          </p>
        </div>
        <div>
          <ExpenseItems Expenses={creditedExpenses} />
        </div>
      </div>

      {addExpense && <AddExpense handlePopup={handlePopup} />}
      <ToastContainer />
    </>
  );
};

export default CreditedExpense;
