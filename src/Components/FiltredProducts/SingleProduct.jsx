import { Button, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../store/features/slices/cartSlice";
import Cart from "../Cart/Cart";

const SingleProduct = () => {
  const singleProduct = useSelector((state) => state.products.singleProduct);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const filters = useSelector((state) => state.products.allFilters);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productSize = filters.size
    ? filters.size
    : singleProduct[0].size
    ? singleProduct[0].size[0]
    : "";
  const productColor =
    filters.color.length > 0
      ? filters.color[filters.color.length - 1]
      : singleProduct[0].color
      ? singleProduct[0].color[0]
      : "";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const arr = singleProduct.filter((product) => product.id === id);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (arr.length <= 0) {
      navigate("/");
    }
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, size, color }));
  };

  return (
    <div>
      {arr.map((item, index) => (
        <div
          key={index}
          className=" flex justify-center items-center py-10 mx-auto w-[90%] custom_lg:w-80p flex-col custom_sm:flex-row"
        >
          <div className="grow-[2]">
            <img
              className="h-[500px] custom_sm:h-[850px] rounded-lg"
              src={item.img}
              alt={item.name}
            />
          </div>
          <div className="grow-[3] p-10 flex flex-col justify-center items-center">
            <div className="max-w-lg">
              <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
                {item.name}
              </h5>
              <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
                15% OFF
              </p>
              <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-normal pb-10">
                {item.text}
              </p>
              <div className="pb-4">
                {item.size ? (
                  <div>
                    <label
                      htmlFor="size"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pick a size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {item.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="size"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pick a size
                    </label>
                    <select
                      id="size"
                      disabled={true}
                      name="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {item?.size?.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pick a color
                </label>
                <select
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {item.color.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-wrap justify-around items-center pt-12 gap-4 px-4">
                <Tooltip content={`$ ${item.price}`} placement="bottom">
                  <Button
                    className="w-48 bg-gray-100 text-gray-700 border border-gray-400 h-16"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Tooltip>
                <Button
                  className="!bg-gray-100 !text-gray-700 !border !border-gray-400 h-16 w-48"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  onClick={handleOpen}
                >
                  <div className="flex flex-row items-center cursor-pointer">
                    <div className="relative inline-block mx-auto">
                      {totalAmount > 0 && (
                        <span className="absolute top-0 left-0 rounded-full bg-red-100 px-1.5 py-1 font-inter text-xs border-[1px] border-red-600 transform -translate-x-1/2 -translate-y-1/3">
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
                    <p className="ml-2">Go to cart</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {open && <Cart openModal={open} setOpen={setOpen} />}
    </div>
  );
};

export default SingleProduct;
