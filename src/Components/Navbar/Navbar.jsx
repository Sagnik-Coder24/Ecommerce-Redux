import React from "react";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { farewellMessage, logout } from "../../store/features/slices/authSlice";
import { Avatar, Tooltip } from "@material-tailwind/react";
import demohuman from "../../assets/images/demohuman.jpg";
import CartButton from "../Cart/CartButton";
import { clearAll } from "../../store/features/slices/cartSlice";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { name, image } = user;

  const cleanName =
    name.charAt("0").toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div>
      <div className="bg-black p-2 w-full">
        <h3 className="text-white font-inter text-2xl font-bold tracking-normal leading-none text-center">
          Welcome {cleanName}
        </h3>
      </div>
      <div className="flex justify-between items-center m-auto w-full md:w-4/5">
        <div className=" h-28 py-3 pr-4">
          <img
            className="object-fill w-full h-full rounded-full border-[1px] border-black p-[3px] shadow-[0_0_20px_0_rgba(0,0,0,0.3)]"
            src={logo}
            alt="store"
          />
        </div>
        <div className="flex flex-row justify-around items-center min-w-[50%] gap-5">
          <div className="flex flex-row items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="w-6 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <p className="font-inter text-base font-medium tracking-normal leading-none text-center ml-1">
              Wish List
            </p>
          </div>
          <div>
            <CartButton totalAmount={totalAmount} text={"Shopping bag"} />
          </div>
          <div className="flex grid-flow-row items-center pl-4">
            {image ? (
              <Avatar
                src={image}
                alt="avatar"
                size="sm"
                className="mr-2 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
              />
            ) : (
              <Avatar
                src={demohuman}
                alt="avatar"
                size="sm"
                className="mr-2 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
              />
            )}
            <div
              onClick={() => {
                dispatch(clearAll());
                dispatch(logout());
                dispatch(farewellMessage(cleanName));
              }}
            >
              <Tooltip content="Sign Out" placement="bottom">
                <p className="font-inter text-base font-medium tracking-normal leading-none cursor-pointer text-center pr-2">
                  Sign Out
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-4 w-full flex justify-around">
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center">
          Upto 50% Off
        </div>
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center">
          Free shipping and returns
        </div>
        <div className="text-white font-inter text-base font-medium tracking-normal leading-none text-center">
          Different payment methods
        </div>
      </div>
    </div>
  );
};

export default Navbar;
