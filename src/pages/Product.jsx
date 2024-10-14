import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/id/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const increaseQuantity = () => {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: selectedQuantity });
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  return (
    <div className="container mt-5">
      {alertVisible && (
        <div className="alert alert-success mt-3" role="alert">
          {product.name} has been added to your cart successfully!
        </div>
      )}
      <div className="row align-items-center justify-content-center col-md-10 m-auto">
        <div className="col-lg-4 col-md-6 col-12 mb-3 mx-auto text-center text-md-start">
          <img
            src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg"
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
            {product.available ? "In Stock" : "Out Of Stock"}
          </p>
          <div className="d-flex align-items-center my-2">
            <button className="btn btn-secondary" onClick={decreaseQuantity}>
              -
            </button>
            <span className="mx-3">{selectedQuantity}</span>
            <button className="btn btn-secondary" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
