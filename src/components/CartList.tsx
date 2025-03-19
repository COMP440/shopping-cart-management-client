import { useEffect, useState } from "react";
import "./CartList.css";
interface CartItem {
  cart_item_id: number;
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total_price: number;
}

export default function CartList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/cart?user_id=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const removeFromCart = (cartItemId: number) => {
    fetch(`http://localhost:8000/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setCartItems(
          cartItems.filter((item) => item.cart_item_id !== cartItemId)
        );
      })
      .catch((error) => console.error("Error removing cart item:", error));
  };

  return (
    <div className="cart-list">
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.cart_item_id} className="cart-item">
            <img
              src="/golf-1208900_1280.jpg"
              alt={item.name}
              className="product-image"
            />
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">Quantity: {item.quantity}</span>
              <span className="item-total-price">
                Total: {item.total_price}$
              </span>
            </div>
            <button className="cart-item-button">Update</button>
            <button
              className="cart-item-button"
              onClick={() => removeFromCart(item.cart_item_id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
