import React, { useState, useEffect } from 'react';
import '../styles/Cart.css'; // Import the CSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from backend API when component mounts
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart');
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleUpdateQuantity = (itemId, quantity) => {
    // Implement functionality to update quantity of an item in the cart
  };

  const handleRemoveItem = (itemId) => {
    // Implement functionality to remove an item from the cart
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
