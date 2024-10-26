import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearAll,
  removeFromCart,
} from "../../store/features/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../FilteredProducts/ScrollToTopButton";
import { singleProduct } from "../../store/features/slices/productsSlice";
import Footer from "../Footer/Footer";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import ChangeColorBtn from "./ChangeColorBtn";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setaddress] = useState("Address");
  const [paymentMethod, setPaymentMethod] = useState("Payment method");

  const handlePayment = () => {
    if (address === "Address" || paymentMethod === "Payment method") {
      alert(
        "Select address and payment method before proceeding.\nThank you..."
      );
    } else {
      Swal.fire({
        title: "<strong>Confirm Purchase !!!</strong>",
        html: `
          <p><strong>Payment Method :</strong> ${paymentMethod}</p>
          <p><strong>Address :</strong> ${address}</p>
          <p><strong>Total Items :</strong> ${totalAmount}</p>
          <p><strong>Total Amount :</strong> $${totalPrice}</p>
          <p class="mt-4 text-green-600 font-semibold">Thank you for shopping with us!</p>
        `,
        icon: "success",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
        customClass: {
          popup: "bg-white rounded-lg p-6 shadow-lg",
          title: "text-xl font-bold mb-4",
          content: "text-black text-sm",
          confirmButton:
            "bg-orange-500 text-white py-2 px-4 hover:bg-orange-600 transition duration-300 ease-in-out mr-10 w-[100px]",
          denyButton:
            "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out w-[100px]",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          dispatch(clearAll());
          navigate("/");
        }
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-orange-50 p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          Checkout Page
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-3/4 mb-4">
          <div className="absolute top-5">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-orange-800 hover:text-orange-700 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-bold text-orange-500 mb-4 py-2">
            Your Cart
          </h2>
          {totalAmount === 0 ? (
            <>
              <h1 className="text-2xl font-bold text-orange-500 mt-6">
                No items in your cart ...
              </h1>
            </>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className={`py-4 flex items-center ${
                      index === 0
                        ? "border-y border-orange-200"
                        : "border-b border-orange-200"
                    }`}
                  >
                    <div className="w-full flex justify-between items-center gap-8 py-4">
                      <img
                        onClick={() => {
                          dispatch(singleProduct(item.id));
                          navigate(
                            `/filtered-products/${item.type}/${item.id}`
                          );
                        }}
                        src={item.img}
                        alt={item.name}
                        className="w-36 object-cover rounded-lg mr-4 cursor-pointer shadow-md"
                      />
                      <div className="w-40">
                        <div className="flex justify-center items-center">
                          <h3 className="text-orange-700 font-semibold mb-9 text-center">
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-700 tracking-normal leading-6">
                          <p>Size</p>
                          <span className="text-black">{item.size}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-700 tracking-normal leading-6">
                          <p>Price</p>
                          <span className="text-black">$ {item.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-700 tracking-normal leading-6">
                          <p>Amount</p>
                          <span className="text-black">{item.amount}</span>
                        </div>
                        <hr className="my-4 border-t-2 border-gray-300" />
                        <div className="flex justify-between items-center text-sm text-gray-700 font-bold tracking-normal leading-6">
                          <p>Total</p>
                          <span className="text-black whitespace-nowrap">
                            $ {item.totalPrice}
                          </span>
                        </div>
                      </div>
                      <div className="w-40 h-full flex flex-col justify-between gap-8">
                        <Button
                          onClick={() => dispatch(addToCart(item))}
                          color="red"
                          variant="gradient"
                          size="sm"
                          className="rounded-full py-4 w-[55px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                        <div className="w-[55px] flex justify-center items-center">
                          <ChangeColorBtn item={item} />
                        </div>
                        <Button
                          onClick={() => dispatch(removeFromCart(item))}
                          color="red"
                          variant="gradient"
                          size="sm"
                          className="rounded-full py-4 w-[55px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-orange-600">
                  Total Items
                </span>
                <span className="text-lg font-semibold text-orange-600">
                  {totalAmount}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-semibold text-orange-600">
                  Total Price
                </span>
                <span className="text-lg font-semibold text-orange-600">
                  $ {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 flex justify-between items-center gap-4 w-full flex-wrap">
                <div className="flex-1 sm:flex-[1] rounded-lg whitespace-nowrap">
                  <Menu placement="top">
                    <MenuHandler title="Change Address">
                      <Button
                        size="lg"
                        color="orange"
                        variant="gradient"
                        className="w-full h-full bg-orange-500 text-white py-2 rounded-lg px-4"
                      >
                        {address}
                      </Button>
                    </MenuHandler>
                    <MenuList className="bg-orange-50 rounded-lg text-black divide-y divide-orange-200">
                      <MenuItem
                        onClick={() => setaddress("Home")}
                        className="hover:bg-orange-200"
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        onClick={() => setaddress("Office")}
                        className="hover:bg-orange-200"
                      >
                        Office
                      </MenuItem>
                      <MenuItem
                        onClick={() => setaddress("Other")}
                        className="hover:bg-orange-200"
                      >
                        Other
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>

                <div className="flex-1 sm:flex-[1] rounded-lg whitespace-nowrap">
                  <Menu placement="top">
                    <MenuHandler title="Change Payment Method">
                      <Button
                        size="lg"
                        color="orange"
                        variant="gradient"
                        className="w-full h-full bg-orange-500 text-white py-2 rounded-lg px-4"
                      >
                        {paymentMethod}
                      </Button>
                    </MenuHandler>
                    <MenuList className="bg-orange-50 rounded-lg text-black divide-y divide-orange-200">
                      <MenuItem
                        onClick={() => setPaymentMethod("Cash")}
                        className="hover:bg-orange-200"
                      >
                        Cash
                      </MenuItem>
                      <MenuItem
                        onClick={() => setPaymentMethod("Credit Card")}
                        className="hover:bg-orange-200"
                      >
                        Credit Card
                      </MenuItem>
                      <MenuItem
                        onClick={() => setPaymentMethod("Debit Card")}
                        className="hover:bg-orange-200"
                      >
                        Debit Card
                      </MenuItem>
                      <MenuItem
                        onClick={() => setPaymentMethod("UPI")}
                        className="hover:bg-orange-200"
                      >
                        UPI
                      </MenuItem>
                      <MenuItem
                        onClick={() => setPaymentMethod("Voucher")}
                        className="hover:bg-orange-200"
                      >
                        Voucher
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>

                <div className="flex-1 sm:flex-[2] rounded-lg whitespace-nowrap">
                  <Button
                    onClick={handlePayment}
                    size="lg"
                    color="orange"
                    variant="gradient"
                    className="w-full h-full bg-orange-500 text-white py-2 rounded-lg px-4"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default Checkout;
