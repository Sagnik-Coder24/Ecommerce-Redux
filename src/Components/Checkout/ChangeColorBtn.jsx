import React, { useState } from "react";
import { storeData } from "../../assets/data/dummyData";
import { Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { modifyGender } from "../../store/features/slices/cartSlice";

const ChangeColorBtn = ({ item }) => {
  const dispatch = useDispatch();

  const [openColors, setOpenColors] = useState(false);

  return (
    <div title="Change Color">
      <button
        onClick={() => {
          setOpenColors((state) => !state);
        }}
        className="w-6 h-6 rounded-full transition duration-300 ease-in-out flex justify-center items-center border-4 hover-bg-custom opacity-80"
        style={{
          backgroundColor: openColors ? item.color : "",
          borderColor: item.color,
          "--hover-color": item.color,
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        }}
      ></button>
      <Transition
        show={openColors}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <div className="h-[188px] absolute -translate-x-20 -translate-y-[105px] flex  items-center">
          <div className="bg-orange-100 rounded-lg p-4 shadow-lg flex flex-col gap-4">
            {storeData
              .filter((product) => product.id === item.id)[0]
              .color.map((color, index) => (
                <i
                  onClick={() => {
                    setOpenColors((state) => !state);
                    dispatch(
                      modifyGender({
                        item,
                        color,
                      })
                    );
                  }}
                  key={index}
                  className="rounded-full p-2 border border-black opacity-80 cursor-pointer hover:opacity-100 transition duration-300 ease-in-out"
                  style={{ backgroundColor: color }}
                ></i>
              ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ChangeColorBtn;
