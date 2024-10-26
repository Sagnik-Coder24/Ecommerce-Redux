import React from "react";
import ProductSectionItem from "./ProductSectionItem";
import { storeData } from "../../assets/data/dummyData";

const mySet = new Set();
while (mySet.size < 12) {
  mySet.add(Math.floor(Math.random() * storeData.length));
}

const tmp = Array.from(mySet);
const randomProducts = storeData.filter((product) =>
  tmp.includes(Number(product.id) - 1)
);

const ProductSection = () => {
  return (
    <div>
      <div className="bg-black p-2 w-[50%] mx-auto rounded-md mt-2">
        <h2 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
          SUMMER T-Shirt SALE 30%
        </h2>
      </div>
      <div className="grid grid-cols-1 custom_sm:grid-cols-2 custom_md:grid-cols-3 custom_lg:grid-cols-4 justify-items-center py-8 gap-2 mx-auto">
        {randomProducts.map((product, index) => (
          <div key={index}>
            <ProductSectionItem
              id={product.id}
              img={product.img}
              type={product.type}
              name={product.name}
              text={product.text}
              size={product.size}
              price={product.price}
              color={product.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
