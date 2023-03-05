import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Get the current year and put it in a span */}
      <p>Copyright Tommy Scott {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
