import React from "react";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="w-full bg-slate-600 fixed bottom-0.5 text-center h-14 flex justify-center items-center text-lg text-white p-8">
        <div className="container mx-auto text-center flex items-center justify-center gap-3">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
          </p>
          <div className>
            <a
              href="https://github.com/Ashwin19v"
              target="target_blank"
              className="text-black hover:underline"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
