import React from "react";
import { storeData } from "../../assets/data/dummyData";
import { Button } from "@material-tailwind/react";
import clothes from "../../assets/images/clothes.jpg";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../store/features/slices/productsSlice";
import { useNavigate } from "react-router-dom";

const mySet = new Set();
storeData.map((item) => mySet.add(item.type));
export const buttons = Array.from(mySet);

const NavigateButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap py-8">
        {buttons.map((button, index) => (
          <div key={index} className="mr-4 mb-4">
            <Button
              color="gray"
              size="lg"
              variant="outlined"
              ripple={true}
              className="hover:bg-orange-100 duration-300 ease-in-out min-w-32"
              onClick={() => {
                // dispatch(buttonClick(true));
                dispatch(filterProducts(button));
                navigate(`/filtered-products/${button}`);
              }}
            >
              {button}
            </Button>
          </div>
        ))}
      </div>
      <div className="bg-black p-2 w-[55%] mx-auto rounded-md">
        <h3 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
          SALES UP TO 50%
        </h3>
      </div>
      <div className="flex items-center justify-center py-4">
        <img
          className="h-[300px] md:h-[600px] w-[70%] rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          alt="clothes"
        />
      </div>
    </div>
  );
};

export default NavigateButtons;
