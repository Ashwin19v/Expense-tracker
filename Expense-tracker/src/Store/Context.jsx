import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  addExpenses,
  getExpenses,
  deleteExpenses,
  updateExpenses,
} from "../service/service";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [creditedtotal, setCreditedTotal] = useState("");
  const [debitedtotal, setDebitedTotal] = useState("");

  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("expense");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const fetchExpenses = async () => {
        try {
          const { data } = await axios.get(getExpenses, {
            params: { userId: user.id },
          });
          setExpenses(data.expenses);
        } catch (error) {
          console.error("Error fetching expenses", error);
        }
      };
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    const CreditedTotalAmount = expenses.filter(
      (expense) => expense.ExpenseType === "credited"
    );
    const calculateTotalAmount = () => {
      return CreditedTotalAmount.reduce((total, item) => {
        return total + item.ExpenseAmount;
      }, 0);
    };
    const totalAmount = calculateTotalAmount();
    setCreditedTotal(totalAmount.toFixed(2));
  }, [expenses]);

  useEffect(() => {
    const DebitedTotalAmount = expenses.filter(
      (expense) => expense.ExpenseType === "debited"
    );
    const calculateTotalAmount = () => {
      return DebitedTotalAmount.reduce((total, item) => {
        return total + item.ExpenseAmount;
      }, 0);
    };
    const totalAmount = calculateTotalAmount();
    setDebitedTotal(totalAmount.toFixed(2));
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(getExpenses, {
        params: { userId: user.id },
      });
      setExpenses(data.expenses);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const addToExpense = async (expense) => {
    const {
      ExpenseAmount,
      ExpenseDate,
      ExpenseDescription,
      ExpenseFor,
      ExpenseName,
      ExpenseType,
    } = expense;
    try {
      await axios.post(addExpenses, {
        ExpenseAmount,
        ExpenseDate,
        ExpenseDescription,
        ExpenseFor,
        ExpenseName,
        ExpenseType,
        userId: user.id,
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(deleteExpenses, {
        data: { id, userId: user.id },
      });
      if (data.message === "Expense deleted successfully") {
        console.log("Deleted");
      }
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      await axios.put(updateExpenses, {
        id,
        updatedExpense,
        userId: user.id,
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("expense");
    setUser(null);
    navigate("/login");
  };

  return (
    <ExpenseContext.Provider
      value={{
        user,
        expenses,

        creditedtotal,
        debitedtotal,
        addToExpense,
        updateExpense,
        deleteExpense,
        logout,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
