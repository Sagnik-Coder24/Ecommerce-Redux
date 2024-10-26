import React from "react";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-white">
      <div className="flex items-center justify-center">
        <hr className="h-px w-full bg-gray-400 opacity-50 outline-none border-none" />
      </div>
      <div className="flex items-center justify-around py-4">
        <div className="h-20">
          <img
            className="object-fill w-full h-full rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="flex items-center">
          <p className="text-black text-sm font-inter no-underline normal-case">
            Made with
          </p>
          <span className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-5 text-red-900"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </span>
          <p className="text-black text-sm font-inter no-underline normal-case ml-1">
            by <span className="underline underline-offset-4">Sagnik </span>
          </p>
        </div>
        <div>
          <p className="text-black text-sm font-inter no-underline normal-case">
            Copyright {year};
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
