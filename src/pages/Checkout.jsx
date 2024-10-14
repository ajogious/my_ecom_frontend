import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  const getTotalPrice = () => {
    const sum = cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    return sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCheckout = () => {
    const orderData = {
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      totalPrice: getTotalPrice(),
      paymentStatus: "Pending",
    };

    axios
      .post("http://localhost:8080/api/orders", orderData)
      .then((response) => {
        setPaymentStatus("Payment successful!");
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setPaymentStatus("Payment failed. Please try again.");
        console.error(error);
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
      <h2>Checkout</h2>
      <ul className="list-group mb-4">
        {cartItems.map((product) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={product.id}
          >
            {product.name} - ₦{product.price.toLocaleString()} x{" "}
            {product.quantity}
          </li>
        ))}
      </ul>
      <h4>
        Total: <strong>₦</strong>
        {getTotalPrice()}
      </h4>
      <button className="btn btn-success" onClick={handleCheckout}>
        Pay with Paystack
      </button>
      {paymentStatus && (
        <p
          className={`mt-3 alert ${
            paymentStatus.includes("successful")
              ? "alert-success"
              : "alert-danger"
          }`}
        >
          {paymentStatus}
        </p>
      )}
    </div>
  );
};

export default Checkout;
