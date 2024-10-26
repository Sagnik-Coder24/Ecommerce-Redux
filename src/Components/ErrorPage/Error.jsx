import { Alert } from "@material-tailwind/react";
import React from "react";

const Error = () => {
  return (
    <div className="grid grid-cols-1 items-center h-[50vh] justify-items-center">
      <div className="w-[96]">
        <Alert color="red" className="text-xl font-inter font-bold">
          Sorry no products match your filter search ... Clear the filter and
          try again 😊
        </Alert>
      </div>
    </div>
  );
};

export default Error;
