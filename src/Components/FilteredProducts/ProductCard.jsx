import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { singleProduct } from "../../store/features/slices/productsSlice";

const ProductCard = ({ id, name, text, img, price, colors }) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <Card
      className="w-96 cursor-pointer mb-10"
      onClick={() => {
        // dispatch(buttonClick(true));
        dispatch(singleProduct(id));
        navigate(`/filtered-products/${[type]}/${id}`);
      }}
    >
      <CardHeader color="blue" className="relative h-96">
        <img
          src={img}
          alt="img-blur-shadow"
          className="object-cover h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <div className="h-[90%] flex items-center justify-center pb-3">
          <Typography>{text}</Typography>
        </div>
      </CardBody>
      <CardFooter
        divider
        className="bg-blue-gray-50 flex items-center justify-between py-3 mt-auto"
      >
        <Typography variant="small">{price} $</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          {colors?.map((color, index) => {
            return (
              <i
                className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-4 "
                key={index}
                style={{ backgroundColor: color }}
              ></i>
            );
          })}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
