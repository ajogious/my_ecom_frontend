import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ConfirmationOverlay from "../components/ConfirmationOverlay";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [setCartItems]);

  // Save cart items to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle remove click with confirmation
  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setOverlayVisible(true);
  };

  // Confirm remove action
  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setOverlayVisible(false);
  };

  // Cancel remove action
  const cancelRemove = () => {
    setOverlayVisible(false);
    setItemToRemove(null);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  };

  // Handle empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 alert alert-warning">
        Your cart is empty
      </div>
    );
  }

  // Render cart items
  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <ul className="list-group mb-4">
        {cartItems.map((product) => (
          <li className="list-group-item" key={product.id}>
            <div className="row align-items-center justify-content-between">
              <div className="col-md-4 col-12 d-block d-md-flex align-items-center text-center text-md-start mb-3 mb-md-0">
                <img
                  src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg"
                  alt={product.name}
                  style={{ width: "100%", maxWidth: "100px" }}
                  className="mb-2 mb-md-0"
                />
                <div className="ms-md-3">
                  <h5>{product.name}</h5>
                  <p>
                    <strong>₦</strong>
                    {product.price.toLocaleString()} x {product.quantity}
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12 d-md-flex justify-content-md-end text-center text-md-end">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-secondary mx-2"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm ms-md-2"
                  onClick={() => handleRemoveClick(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h4>
        Total: <strong>₦</strong>
        {getTotalPrice()}
      </h4>
      <Link to="/checkout" className="btn btn-primary">
        Proceed to Checkout
      </Link>

      {isOverlayVisible && (
        <ConfirmationOverlay
          message="Are you sure you want to remove this item from the cart?"
          onConfirm={confirmRemove}
          onCancel={cancelRemove}
        />
      )}
    </div>
  );
};

export default Cart;
