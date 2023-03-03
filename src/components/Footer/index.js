import React from "react";
import { HashRouter, Link } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/"> Home </Link>
      <Link to="/about"> About </Link>
      <Link to="/contact"> Contact </Link>
      <Link to="/projects"> Projects </Link>
    </footer>
  );
}

export default Footer;
