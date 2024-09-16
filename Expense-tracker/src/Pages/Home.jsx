import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ExpenseContext } from "../Store/Context";
const Home = () => {
  const { total, creditedtotal, debitedtotal } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const creditedPercentage =
    (Number(creditedtotal) / (Number(creditedtotal) + Number(debitedtotal))) *
    100;

  const debitedPercentage =
    (Number(debitedtotal) / (Number(creditedtotal) + Number(debitedtotal))) *
    100;

  const balance =
    ((Number(creditedtotal) - Number(debitedtotal)) / creditedtotal) * 100;

  return (
    <>
      <div className="flex flex-col items-center justify-center my-12 p-4 bg-slate-200 h-auto max-w-3/4 mx-auto overflow-x-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full md:w-1/2 bg-white border-2 border-gray-900 rounded-lg shadow-lg h-auto max-h-[320px] overflow-hidden">
            <div className="p-4 bg-gray-300 flex items-center justify-between md:justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Credited
              </h1>
              <h1
                className="text-4xl md:text-6xl font-semibold text-blue-500 cursor-pointer"
                onClick={() => navigate("/credited")}
              >
                <IoMdArrowDropdown />
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between p-6">
              <div className="text-center mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-green-500">
                  ${creditedtotal}
                </h1>
              </div>
              <div className="h-24 md:h-40 w-24 md:w-40">
                <CircularProgressbar
                  value={Math.floor(creditedPercentage)}
                  text={`${Math.floor(creditedPercentage)}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    textColor: "#000",
                    pathColor: "green",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
            <div className="text-center p-4 text-gray-500">
              <p>Click dropdown to see all credited logs</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white border-2 border-gray-900 rounded-lg shadow-lg h-auto max-h-[320px] overflow-hidden">
            <div className="p-4 bg-gray-300 flex items-center justify-between md:justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Debited
              </h1>
              <h1
                className="text-4xl md:text-6xl font-semibold text-blue-500 cursor-pointer"
                onClick={() => navigate("/debited")}
              >
                <IoMdArrowDropdown />
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between p-6">
              <div className="text-center mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-red-500">
                  ${debitedtotal}
                </h1>
              </div>
              <div className="h-24 md:h-40 w-24 md:w-40">
                <CircularProgressbar
                  value={Math.floor(debitedPercentage)}
                  text={`${Math.floor(debitedPercentage)}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    textColor: "#000",
                    pathColor: "tomato",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
            </div>
            <div className="text-center p-4 text-gray-500">
              <p>Click dropdown to see all debited logs</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 bg-white border-2 border-gray-900 rounded-lg shadow-lg h-auto max-h-[330px]">
          <div className="p-4 bg-gray-300 flex items-center justify-between md:justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              All Expenses
            </h1>
            <h1
              className="text-4xl md:text-6xl font-semibold text-blue-500 cursor-pointer"
              onClick={() => navigate("/all")}
            >
              <IoMdArrowDropdown />
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex flex-col items-center md:flex-row gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">Balance:</h1>
              <h1 className="text-4xl md:text-5xl font-semibold text-blue-500">
                ${creditedtotal - debitedtotal}
              </h1>
            </div>
            <div className="h-24 md:h-40 w-24 md:w-40">
              <CircularProgressbar
                value={Math.floor(balance)}
                text={`${Math.floor(balance)}%`}
                strokeWidth={12}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: "#3b82f6",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
          <div className="text-center  text-gray-500 ">
            <p>Click dropdown to see all expense logs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
