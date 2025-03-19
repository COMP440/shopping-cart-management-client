import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<div>Cart Page</div>} />
      </Routes>
    </>
  );
}

export default App;
