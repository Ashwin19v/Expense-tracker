import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { ExpenseContext } from "../Store/Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(ExpenseContext);
  return (
    <>
      <nav className="fixed top-0 bg-slate-400 w-full flex h-12 justify-between items-center text-xl p-5">
        <div>
          <h3 className="font-bold mx-4" onClick={() => navigate("/")}>
            Expensify 💰
          </h3>
        </div>
        <ul className="flex justify-between items-center gap-4 mx-4">
          <li onClick={logout}>
            <IoLogOut />
          </li>
          <li onClick={() => navigate("/profile")}>
            <CgProfile />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
