import { useEffect, useState } from "react";
import "./ProductList.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    fetch("http://localhost:8000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        product_id: product.id,
        quantity: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        alert(`${product.name} has been added to the cart.`);
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src="/golf-1208900_1280.jpg"
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price}$</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
