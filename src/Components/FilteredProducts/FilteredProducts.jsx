import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {
  filterByColor,
  filterBySize,
  filterGender,
  filterProducts,
  sortByPrice,
} from "../../store/features/slices/productsSlice";
import Error from "../ErrorPage/Error";
import CartButton from "../Cart/CartButton";
import ScrollToTopButton from "./ScrollToTopButton";
import { storeData } from "../../assets/data/dummyData";
import { buttons } from "../NavigateButtons/NavigateButtons";

const FilteredProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);
  const filters = useSelector((state) => state.products.allFilters);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  const filter_gender = filters.gender;
  const filter_color = filters.color;
  const filter_size = filters.size;

  const [price_sort, setPrice_sort] = useState("High");

  //   const buttonClickStatus = useSelector(
  //     (state) => state.products.buttonClicked
  //   );
  //   const dispatch = useDispatch();

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!buttonClickStatus) {
  //       navigate("/");
  //     }
  //   }, [navigate]);

  const filtered_array = products.filter((product) => product.type === type);
  useEffect(() => {
    // dispatch(buttonClick(false));
    window.scrollTo(0, 0);
    if (filtered_array.length <= 0) {
      if (buttons.includes(type)) dispatch(filterProducts(type));
      else {
        navigate("/");
      }
    }
  }, []);

  const genderButtons = ["male", "female"];

  const mySet = new Set();
  storeData
    .filter((product) => product.type === type)
    .map((item) => item.color.map((color) => mySet.add(color)));
  const colorButtons = Array.from(mySet);

  const sizeButtons = ["XS", "S", "M", "L", "XL", "XXL"];

  let shoeSize = [];
  if (type === "Shoes") {
    const mySet2 = new Set();
    storeData
      .filter((product) => product.type === type)
      .map((item) =>
        item?.size?.map((size) => !isNaN(size) && mySet2.add(size))
      );
    shoeSize = Array.from(mySet2).sort((a, b) => a - b);
  }

  return (
    <>
      <div className="pt-16">
        <div className="shadow-lg rounded-lg p-2 absolute right-5 top-4 hover:translate-y-1 duration-300 ease-in-out flex flex-row border-black border-[1px] bg-orange-300 hover:bg-orange-600">
          <CartButton totalAmount={totalAmount} text={"Cart"} />
        </div>
        <div className="pl-14 pb-5">
          <h1 className="text-4xl font-inter text-gray-600 font-bold tracking-normal leading-none">
            {type}
          </h1>
          <div className="flex items-center justify-between py-8">
            <div className="flex items-center flex-wrap">
              {genderButtons.map((item, index) => (
                <div key={index}>
                  <Button
                    onClick={() => {
                      dispatch(filterGender(item));
                    }}
                    color="gray"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className={
                      filter_gender === item
                        ? "text-black hover:bg-orange-600 duration-300 ease-in-out mr-4 mb-2 bg-orange-300 min-w-44"
                        : "text-black hover:bg-orange-100 duration-300 ease-in-out mr-4 mb-2 min-w-44"
                    }
                  >
                    {item}
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => {
                  dispatch(sortByPrice(price_sort));
                  setPrice_sort((state) => (state === "High" ? "Low" : "High"));
                }}
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="text-black hover:bg-orange-100 duration-300 ease-in-out mr-4 mb-2 min-w-44"
              >
                {price_sort} Price
              </Button>
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <Button
                    color="gray"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className="text-black hover:bg-orange-100 duration-300 ease-in-out mr-4 mb-2 min-w-44"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <p>Select a color</p>
                      {filter_color.length > 0 &&
                        filter_color.map((color, index) => (
                          <i
                            key={index}
                            className="rounded-full p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-2px_rgba(0,0,0,0.1)]"
                            style={{ backgroundColor: color }}
                          ></i>
                        ))}
                    </div>
                  </Button>
                </MenuHandler>
                <MenuList>
                  {colorButtons.map((color, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => dispatch(filterByColor(color))}
                      className={
                        filter_color.includes(color)
                          ? "bg-blue-500 text-white font-bold my-1 hover:bg-blue-100"
                          : "bg-white text-gray-700"
                      }
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          {color.charAt("0").toUpperCase() +
                            color.slice(1).toLowerCase()}
                        </p>
                        <i
                          className="rounded-full p-2 border-[1px] border-black"
                          style={{ backgroundColor: color }}
                        ></i>
                      </div>
                    </MenuItem>
                  ))}
                  {filter_color.length > 0 && <hr className="my-3" />}
                  {filter_color.length > 0 && (
                    <MenuItem onClick={() => dispatch(filterByColor(false))}>
                      Clear this filter
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <Button
                    disabled={type === "Bags"}
                    color="gray"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className="text-black hover:bg-orange-100 duration-300 ease-in-out mr-4 mb-2 min-w-44"
                  >
                    <div className="flex justify-between items-center gap-4 text-nowrap">
                      <p>Select a size</p>
                      {filter_size && <span>( {filter_size} )</span>}
                    </div>
                  </Button>
                </MenuHandler>
                {type === "Shoes" ? (
                  <MenuList>
                    {shoeSize.map((size, index) => (
                      <MenuItem
                        onClick={() => dispatch(filterBySize(size))}
                        key={index}
                      >
                        {size}
                      </MenuItem>
                    ))}
                    <hr className="my-3" />
                    <MenuItem onClick={() => dispatch(filterBySize(false))}>
                      Clear this filter
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList>
                    {sizeButtons.map((size, index) => (
                      <MenuItem
                        onClick={() => dispatch(filterBySize(size))}
                        key={index}
                      >
                        {size}
                      </MenuItem>
                    ))}
                    {filter_size && <hr className="my-3" />}
                    {filter_size && (
                      <MenuItem onClick={() => dispatch(filterBySize(false))}>
                        Clear this filter
                      </MenuItem>
                    )}
                  </MenuList>
                )}
              </Menu>
            </div>
            <div className="pr-14">
              <Button
                onClick={() => {
                  dispatch(filterProducts(type));
                  setPrice_sort("High");
                }}
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="text-black hover:bg-orange-100 duration-300 ease-in-out mr-4 mb-2 min-w-44"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        {error ? (
          <Error />
        ) : (
          <div className="grid grid-cols-1 custom_sm:grid-cols-2 custom_md:grid-cols-3 custom_lg:grid-cols-4 justify-items-center py-8 gap-3">
            {filtered_array.map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                text={product.text}
                img={product.img}
                price={product.price}
                colors={product.color}
              />
            ))}
          </div>
        )}
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default FilteredProducts;
