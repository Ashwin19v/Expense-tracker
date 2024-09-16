const express = require("express");
const Expense = require("../Models/Expensemodel");
const router = express.Router();

router.post("/addexpense", async (req, res) => {
  const {
    ExpenseName,
    ExpenseAmount,
    ExpenseFor,
    ExpenseDescription,
    ExpenseType,
    ExpenseDate,
    userId,
  } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const newExpense = new Expense({
      ExpenseName,
      ExpenseAmount,
      ExpenseFor,
      ExpenseDescription,
      ExpenseType,
      ExpenseDate,
      user: userId,
    });
    await newExpense.save();
    return res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getexpense", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const expenses = await Expense.find({ user: userId });

    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching expenses", error });
  }
});

router.delete("/deleteexpense", async (req, res) => {
  const { id, userId } = req.body;

  if (!id || !userId) {
    return res
      .status(400)
      .json({ message: "Expense ID and User ID are required" });
  }

  try {
    const result = await Expense.findOneAndDelete({ _id: id, user: userId });
    if (result) {
      return res.status(200).json({ message: "Expense deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting expense", error });
  }
});

router.put("/updateexpense", async (req, res) => {
  const { id, userId, updatedExpense } = req.body;
  if (!id || !userId || !updatedExpense) {
    return res
      .status(400)
      .json({ message: "Expense ID, User ID, and updated data are required" });
  }

  try {
    await Expense.findOneAndUpdate({ _id: id, user: userId }, updatedExpense, {
      new: true,
    });
    return res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating expense", error });
  }
});
module.exports = router;
