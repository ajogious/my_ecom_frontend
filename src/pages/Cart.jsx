import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ConfirmationOverlay from "../components/ConfirmationOverlay ";

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

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setOverlayVisible(true);
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setOverlayVisible(false);
  };

  const cancelRemove = () => {
    setOverlayVisible(false);
    setItemToRemove(null);
  };

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems)); // Restore cart data from localStorage
    }
  }, [setCartItems]);

  // Save cart data to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const getTotalPrice = () => {
    const sum = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Format to 2 decimal places and then convert to a locale string
    return sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 alert alert-warning">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <ul className="list-group mb-4">
        {cartItems.map((product) => (
          <li className="list-group-item" key={product.id}>
            <div className="row align-items-center justify-content-between">
              <div className="col-md-4 col-12 d-block d-md-flex align-items-center text-center text-md-start mb-3 mb-md-0">
                <img
                  src="https://www.istore.com.ng/cdn/shop/products/13_8e85d054-6dff-436a-aeab-ddee90a28377_5000x.jpg" /* {product.imageUrl} */
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

              {/* Increase, Decrease, Remove Buttons */}
              <div className="col-md-4 col-12 d-md-flex justify-content-md-end text-center text-md-end">
                <div className="mb-3 mb-md-0">
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
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm ms-md-2"
                    onClick={() => handleRemoveClick(product.id)}
                  >
                    Remove
                  </button>
                </div>
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
