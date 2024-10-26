import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../../assets/data/dummyData";

const filterFunction = (state) => {
  const filters = state.allFilters;
  let finalResult =
    JSON.parse(sessionStorage.getItem("filteredData")) ||
    state.filteredProducts;
  state.error = false;

  if (filters.type) {
    finalResult = finalResult.filter(
      (product) => product.type === filters.type
    );
  }

  if (filters.gender) {
    finalResult = finalResult.filter(
      (product) => product.gender === filters.gender
    );
  }

  if (filters.color.length > 0) {
    finalResult = finalResult.filter((product) =>
      filters.color.every((color) => product.color.includes(color))
    );
  }

  if (filters.size) {
    finalResult = finalResult.filter((product) =>
      product.size.includes(filters.size)
    );
  }

  if (finalResult.length < 1) {
    state.error = true;
    return;
  }

  state.filteredProducts = finalResult;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredData")) || storeData,
    singleProduct:
      JSON.parse(sessionStorage.getItem("oneProduct")) || storeData,
    error: false,
    allFilters: {
      gender: "",
      color: [],
      size: "",
    },
    // buttonClicked: true,
  },
  reducers: {
    filterProducts: (state, action) => {
      state.allFilters = {
        ...state.allFilters,
        gender: "",
        color: [],
        size: "",
      };
      try {
        const filter = storeData.filter(
          (product) => product.type === action.payload
        );
        state.filteredProducts = filter;
        state.error = false;
        sessionStorage.setItem(
          "filteredData",
          JSON.stringify(state.filteredProducts)
        );
      } catch (error) {
        return error;
      }
    },
    singleProduct: (state, action) => {
      try {
        const oneProduct = storeData.filter(
          (product) => product.id === action.payload
        );
        state.singleProduct = oneProduct;
        sessionStorage.setItem("oneProduct", JSON.stringify(oneProduct));
      } catch (error) {
        return error;
      }
    },
    filterGender: (state, action) => {
      if (state.allFilters.gender === action.payload) {
        state.allFilters.gender = "";
        filterFunction(state);
      } else {
        state.allFilters.gender = action.payload;
        try {
          filterFunction(state);

          // const gender = state.filteredProducts.filter(
          //   (product) => product.gender === action.payload
          // );
          // state.error.false;
          // state.filteredProducts = gender;
          // const oneGenderType = gender.length > 0;
          // if (oneGenderType) {
          //   state.error = false;
          //   const saveState = JSON.stringify(gender);
          //   sessionStorage.setItem("filteredData", saveState);
          // } else {
          //   state.error = true;
          //   state.filteredProducts = [];
          // }
        } catch (error) {
          return error;
        }
      }
    },
    sortByPrice: (state, action) => {
      try {
        const price = state.filteredProducts.sort((a, b) =>
          action.payload === "High" ? b.price - a.price : a.price - b.price
        );
        if (price.length > 0) {
          state.error = false;
          state.filteredProducts = price;
          sessionStorage.setItem("filteredData", JSON.stringify(price));
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (error) {
        return error;
      }
    },
    filterByColor: (state, action) => {
      try {
        if (action.payload) {
          if (state.allFilters.color.includes(action.payload)) {
            state.allFilters.color = state.allFilters.color.filter(
              (color) => color !== action.payload
            );
            filterFunction(state);
          } else {
            state.allFilters.color.push(action.payload);
            filterFunction(state);
          }
        } else {
          state.allFilters.color = [];
          filterFunction(state);
        }

        // const color = state.filteredProducts.filter((product) =>
        //   product.color.includes(action.payload)
        // );
        // if (color.length <= 0) {
        //   state.error = true;
        //   state.filteredProducts = [];
        // } else {
        //   state.error = false;
        //   state.filteredProducts = color;
        //   const saveState = JSON.stringify(color);
        //   sessionStorage.setItem("filteredData", saveState);
        // }
      } catch (error) {
        return error;
      }
    },
    filterBySize: (state, action) => {
      try {
        if (action.payload) {
          state.allFilters.size = action.payload;
          filterFunction(state);
        } else {
          state.allFilters.size = "";
          filterFunction(state);
        }

        // const size = state.filteredProducts.filter((product) =>
        //   product.size.includes(action.payload)
        // );
        // if (size.length <= 0) {
        //   state.error = true;
        //   state.filteredProducts = [];
        // } else {
        //   state.error = false;
        //   state.filteredProducts = size;
        //   const saveState = JSON.stringify(size);
        //   sessionStorage.setItem("filteredData", saveState);
        // }
      } catch (error) {
        return error;
      }
    },
    // buttonClick: (state, action) => {
    //   state.buttonClicked = action.payload;
    // },
  },
});

export const {
  filterProducts,
  singleProduct,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} = productsSlice.actions;
export default productsSlice.reducer;
