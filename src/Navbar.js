import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar_container">
      <img src="https://images.cooltext.com/5652962.png" alt="Escrow logo" />
      <div className="buttons">
        <button className="btn">
          <Link style={{ textDecoration: "none", color: "#473F2E" }} to="/">
            New Contract
          </Link>
        </button>
        <button className="btn">
          <Link
            style={{ textDecoration: "none", color: "#473F2E" }}
            to="/existing"
          >
            Existing Contract
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
