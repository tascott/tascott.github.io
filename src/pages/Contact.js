import React from "react";
import ContactForm from "../components/ContactForm/index.js";
import cv from "../assets/cv.pdf";

function Contact() {
  return (
    <div className="contact">
      <h2>Contact</h2>
      <a href="mailto:contact@tascott.co.uk">contact@tascott.co.uk</a>
      <ContactForm />
      <a href={cv} download className="btn btn-dark contact-btn">Download CV</a>
      <a href="https://www.linkedin.com/in/tascott/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="https://github.com/tascott" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  );
}

export default Contact;
