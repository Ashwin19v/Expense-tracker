const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    ExpenseName: {
      type: String,
      required: true,
      trim: true,
    },
    ExpenseAmount: {
      type: Number,
      required: true,
    },
    ExpenseFor: {
      type: String,
      required: true,
    },
    ExpenseType: {
      type: String,
      required: true,
    },
    ExpenseDate: {
      type: Date,
      default: Date.now,
    },
    ExpenseDescription: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
