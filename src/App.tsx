import { Navigate, Route, Routes } from "react-router-dom";
import CartList from "./components/CartList";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </>
  );
}

export default App;
