import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card border-0 text-center" style={{ width: "100%" }}>
      <Link to={`/product/${product.id}`}>
        <img
          src="https://www.istore.com.ng/cdn/shop/products/13_8e85d054-6dff-436a-aeab-ddee90a28377_5000x.jpg"
          /*{product.imageUrl}*/ alt={product.name}
          className="card-img-top img-fluid"
        />
      </Link>

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          <strong>₦</strong>
          {product.price.toLocaleString()}
        </p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
