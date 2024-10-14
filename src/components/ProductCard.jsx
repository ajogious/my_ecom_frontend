import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 text-center border-0">
      <img
        src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg" // Assuming the product image URL comes from your database
        alt={product.name}
        className="card-img-top img-fluid"
        style={{ maxHeight: "200px", objectFit: "contain" }} // Makes the image smaller and contained
        loading="lazy" // Lazy loading for performance
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          <strong>₦</strong>
          {product.price.toLocaleString()}
        </p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
