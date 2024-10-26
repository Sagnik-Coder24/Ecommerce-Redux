import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  removeFromCart,
} from "../../store/features/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = ({ openModal, setOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {cart.length > 0 ? (
        <Dialog
          className="overflow-y-auto max-h-[80%] border-0 outline-0"
          open={openModal}
          handler={() => setOpen(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Shopping Bag</DialogHeader>
          <DialogBody
            divider
            className="flex flex-col justify-center items-start"
          >
            {cart.map((item, index) => (
              <div key={index} className="w-full">
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div>
                    <img
                      className="h-[125px] w-[95px] rounded-md"
                      src={item.img}
                      alt={item.name}
                    />
                    <div className="flex flex-col items-start">
                      <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="max-w-xs">
                      <p className="text-black text-xs font-inter tracking-normal leading-normal pt-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Selected size:{" "}
                      <span className="ml-2">
                        {item.size === "" ? "N/A" : item.size}
                      </span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Selected color:{" "}
                      <span
                        className="ml-2 rounded-full px-2 "
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Amount: <span className="ml-2">{item.amount}</span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Single Item Price:{" "}
                      <span className="ml-2">{item.price} $</span>
                    </p>
                    <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                      Total Items Price:{" "}
                      <span className="ml-2">{item.totalPrice} $</span>
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => dispatch(removeFromCart(item))}
                        size="sm"
                        color="red"
                        variant="gradient"
                        ripple={true}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </DialogBody>
          <DialogFooter className="flex justify-between items-center pb-5">
            <div className="flex justify-start items-center text-black text-base font-inter tracking-normal leading-none">
              <p>Total Price: </p>
              <span className="font-bold ml-2 w-20">{totalPrice} $</span>
            </div>
            <div className="flex justify-evenly items-center gap-4">
              <Button
                onClick={() => {
                  dispatch(clearAll());
                }}
                size="sm"
                color="red"
                variant="outlined"
                ripple={true}
              >
                Clear Cart
              </Button>
              <Button
                onClick={() => {
                  navigate("/checkout");
                }}
                size="sm"
                color="red"
                variant="outlined"
                ripple={true}
              >
                Check out
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      ) : (
        <Dialog
          className="border-0 outline-0"
          open={openModal}
          handler={() => setOpen(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Shopping Bag</DialogHeader>
          <DialogBody divider>
            <div>
              <h1 className="text-black text-3xl font-inter font-bold tracking-normal leading-none py-4">
                Your bag is empty
              </h1>
              <p className="text-black text-base font-inter tracking-normal leading-none pb-4">
                Add some products
              </p>
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-start items-center pt-5">
            <p className="flex justify-center  text-black text-sm font-inter tracking-normal leading-none">
              If you want high quality products, you have come to the right
              place
            </p>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export default Cart;
