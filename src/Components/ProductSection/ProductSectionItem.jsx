import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/slices/cartSlice";
import { singleProduct } from "../../store/features/slices/productsSlice";
import { useNavigate } from "react-router-dom";

const ProductSectionItem = ({
  id,
  img,
  name,
  text,
  type,
  size,
  price,
  color,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultSize = size ? size[0] : "N/A";
  const defaultColor = color[0];

  return (
    <div>
      <Card className="w-96 mb-4">
        <CardHeader
          onClick={() => {
            dispatch(singleProduct(id));
            navigate(`/filtered-products/${type}/${id}`);
          }}
          floated={false}
          className="h-96 cursor-pointer"
        >
          <img src={img} alt={name} className="h-full w-full object-cover" />
          <Typography
            variant="h4"
            className="mb-2 absolute -rotate-45 top-6 right-1 z-10 text-red-700 text-lg opacity-90"
          >
            SALE%
          </Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="gray" className="font-medium h-32" textGradient>
            <span className="h-full flex justify-center items-center">
              {text}
            </span>
          </Typography>
          <div className="flex justify-between items-center pt-4">
            <Typography color="red" className="font-medium" textGradient>
              Size left:{" "}
              <span className="text-gray-400 text-base font-extralight">
                {defaultSize}
              </span>
            </Typography>
            <Typography color="gray" className="font-medium" textGradient>
              Color:{" "}
              <span
                className="ml-2 rounded-full px-2 border-[1px] border-black"
                style={{
                  backgroundColor: defaultColor,
                }}
              ></span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content={"$ " + price} placement="bottom">
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    id,
                    img,
                    name,
                    type,
                    text,
                    size: defaultSize,
                    price,
                    color: defaultColor,
                  })
                )
              }
              size="lg"
              color="gray"
              variant="outlined"
              ripple={true}
            >
              Add to Cart
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductSectionItem;
