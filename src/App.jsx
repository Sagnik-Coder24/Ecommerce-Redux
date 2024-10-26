import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main/Main";
import FilteredProducts from "./Components/FilteredProducts/FilteredProducts";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import SingleProduct from "./Components/FilteredProducts/SingleProduct";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  const user = useSelector((state) => state.auth.user);
  const { authUser } = user;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser ? <Main /> : <Login />}></Route>
          <Route
            path="/filtered-products/:type"
            element={<FilteredProducts />}
          ></Route>
          <Route
            path="/filtered-products/:type/:id"
            element={<SingleProduct />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
