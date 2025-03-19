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
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/cart?user_id=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) =>
        console.error("Error fetching updated cart items:", error)
      );
  }, []);

  useEffect(() => {
    const total = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
    setTotalAmount(parseFloat(total));
  }, [cartItems]);

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

  const incrementQuantity = (item: CartItem) => {
    fetch(`http://localhost:8000/cart/${item.cart_item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.cart_item_id === item.cart_item_id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                  total_price: (cartItem.quantity + 1) * cartItem.price,
                }
              : cartItem
          )
        );
      })
      .catch((error) => console.error("Error updating cart item:", error));
  };

  const decrementQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:8000/cart/${item.cart_item_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setCartItems(
            cartItems.map((cartItem) =>
              cartItem.cart_item_id === item.cart_item_id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                    total_price: (cartItem.quantity - 1) * cartItem.price,
                  }
                : cartItem
            )
          );
        })
        .catch((error) => console.error("Error updating cart item:", error));
    }
  };

  const placeOrder = () => {
    fetch("http://localhost:8000/cart/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setCartItems([]);
        alert("Order placed successfully!");
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <div className="cart-list">
      <div className="cart-header">
        <h2>Cart Items</h2>
        <span className="total-amount">Total: {totalAmount}$</span>
        <button className="order-button" onClick={() => placeOrder()}>
          Place your order
        </button>
      </div>
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
              <span className="item-total-price">
                Total: {(item.price * item.quantity).toFixed(2)}$
              </span>
            </div>

            <div className="item-quantity-container">
              <button onClick={() => decrementQuantity(item)}>-</button>
              <span className="item-quantity">{item.quantity}</span>
              <button onClick={() => incrementQuantity(item)}>+</button>
            </div>

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
