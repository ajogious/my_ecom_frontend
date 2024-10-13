import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Track selected quantity
  const [alertVisible, setAlertVisible] = useState(false); // State to show/hide alert

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/id/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  // Function to handle quantity increase
  const increaseQuantity = () => {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  // Function to handle manual input
  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value, 10);

    // Ensure the input is a number and within the valid range
    if (!isNaN(value) && value >= 1 && value <= product.quantity) {
      setSelectedQuantity(value);
    } else if (value < 1) {
      setSelectedQuantity(1); // Set to minimum if the user enters below 1
    } else if (value > product.quantity) {
      setSelectedQuantity(product.quantity); // Set to maximum if above stock
    }
  };

  // Function to handle adding to cart with a success alert
  const handleAddToCart = () => {
    addToCart(product);
    setAlertVisible(true); // Show alert when product is added

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className="container mt-5">
      {alertVisible && (
        <div className="alert alert-success mt-3" role="alert">
          {product.name} has been added to your cart successfully!
        </div>
      )}
      <div className="row align-items-center justify-content-center col-md-10 m-auto">
        <div className="col-lg-4 col-md-6 col-12 mb-3 mb-md-0 mx-auto text-center text-md-start">
          <img
            src="https://www.istore.com.ng/cdn/shop/products/13_8e85d054-6dff-436a-aeab-ddee90a28377_5000x.jpg" /*{product.imageUrl} */
            alt={product.name}
            style={{ width: "300px" }}
            className="img-fluid"
          />
        </div>

        <div className="col-lg-7 col-md-6 col-12 mx-auto text-center text-md-start">
          <h2>{product.name}</h2>
          <h6>{product.category}</h6>
          <p>{product.description}</p>
          <p>
            <strong>₦</strong>
            {product.price.toLocaleString()}
          </p>
          <p className="text-muted">
            {product.available ? "In Stock" : " Out Of Stock"}
          </p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
