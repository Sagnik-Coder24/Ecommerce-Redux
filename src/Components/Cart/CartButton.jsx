import React, { useState } from "react";
import Cart from "./Cart";

const CartButton = ({ totalAmount, text }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <div
      className="flex flex-row items-center cursor-pointer ml-1"
      onClick={handleOpen}
    >
      <div className="relative inline-block">
        {totalAmount > 0 && (
          <span className="absolute top-0 left-0 rounded-full bg-red-100 px-1.5 py-1 font-inter text-xs border-[1px] border-red-600 transform -translate-x-1/2 -translate-y-1/2">
            {totalAmount < 10 ? `0${totalAmount}` : totalAmount}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#000"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <p className="font-inter text-base font-medium tracking-normal leading-none text-center ml-2">
        {text}
      </p>
      <div>{open && <Cart openModal={open} setOpen={setOpen} />}</div>
    </div>
  );
};

export default CartButton;
