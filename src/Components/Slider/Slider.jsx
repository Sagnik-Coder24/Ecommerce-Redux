import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dotSlide,
  nextSlide,
  prevSlide,
} from "../../store/features/slices/sliderSlice";
import { sliderData } from "../../assets/data/dummyData";

const Slider = () => {
  const slideIndex = useSelector((state) => state.slider.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextSlide(slideIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div className="relative pb-4">
      <div className="h-[500px] w-full md:h-[850px]">
        {sliderData.map((item) => {
          return (
            <div
              key={item.id}
              className={
                parseInt(item.id) === slideIndex
                  ? "opacity-100 duration-700 ease-in-out scale-100"
                  : "opacity-0 duration-700 ease-in-out scale-95"
              }
            >
              <div>
                <img
                  className="absolute h-[500px] w-full md:h-[850px] object-cover"
                  src={item.img}
                  alt="shoes"
                ></img>
              </div>
              <div className="absolute top-28 md:top-44 mx-auto left-[50%] -translate-x-1/2">
                <p className="text-white text-4xl font-inter font-bold tracking-normal leading-none [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000]">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex absolute bottom-12  left-[50%] -translate-x-1/2">
        {sliderData.map((dot, index) => {
          return (
            <div className="mr-4" key={dot.id}>
              <div
                className={
                  index === slideIndex
                    ? "bg-green-300 rounded-full p-2 cursor-pointer"
                    : "bg-white rounded-full p-2 cursor-pointer"
                }
                onClick={() => dispatch(dotSlide(index))}
              ></div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="absolute top-[50%] right-4 bg-white rounded-full p-2 hover:bg-green-300"
          onClick={() => dispatch(nextSlide(slideIndex + 1))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          className="absolute top-[50%] left-4 bg-white rounded-full p-2 hover:bg-green-300"
          onClick={() => dispatch(prevSlide(slideIndex - 1))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
