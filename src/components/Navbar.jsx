import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingBag } from "react-icons/fa"; // For the cart icon

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav
      className="navbar navbar-expand-md bg-primary fixed-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="nav-link position-relative" to="/cart">
              <FaShoppingBag size={24} />
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.75rem" }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
            <form className="d-flex ms-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
