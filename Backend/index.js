const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/expense-tracker";
app.use(cors());
app.use(express.json());
const authRoutes = require("./Routes/Auth");
const expenseRoute = require("./Routes/Expense");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/expense", expenseRoute);

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
