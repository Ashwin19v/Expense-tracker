import React, { useContext, useEffect } from "react";
import { IoCaretBackCircle } from "react-icons/io5";
import { ExpenseContext } from "../../Store/Context";
import { useNavigate } from "react-router-dom";
import ExpenseItems from "../../Components/ExpenseItems";

const AllExpense = () => {
  const { expenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="w-4/5 h-[50px] bg-slate-600 mt-12 flex justify-between items-center mx-auto p-4 text-2xl font-bold text-white">
          <p onClick={() => navigate(-1)}>
            <IoCaretBackCircle />
          </p>
          <h2>All Expenses</h2>
          <div>{"    "}</div>
        </div>

        <div>
          <ExpenseItems Expenses={expenses} />
        </div>
      </div>
    </>
  );
};

export default AllExpense;
