import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import CreditedExpense from "./Pages/Expenses/CreditedExpense";
import DebitedExpense from "./Pages/Expenses/DebitedExpense";
import AllExpense from "./Pages/Expenses/AllExpense";
import ExpenseDetails from "./Pages/Expenses/ExpenseDetails";
import Layout from "./Pages/Layout";
import { ExpenseProvider } from "./Store/Context";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <ExpenseProvider>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/signin" Component={Signin} />
            <Route path="/" Component={Layout}>
              <Route path="/" Component={Home} />
              <Route path="credited" Component={CreditedExpense} />
              <Route path="debited" Component={DebitedExpense} />
              <Route path="all" Component={AllExpense} />
              <Route path="details" Component={ExpenseDetails} />
              <Route path="profile" Component={Profile} />
            </Route>
          </Routes>
        </ExpenseProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
