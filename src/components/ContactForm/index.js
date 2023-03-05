import React, { useState } from "react";
import "./style.css";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", message: "" });

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      setFormData({ name: value, message: formData.message });
    } else if (name === "message") {
      setFormData({ name: formData.name, message: value });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (formData.name === "" || formData.message === "") {
      alert("Please fill out all fields");
      return;
    }

    setFormData({
      name: "",
      message: "",
    });
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-group">
          <input
            value={formData.name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            value={formData.message}
            name="message"
            onChange={handleInputChange}
            type="text"
            placeholder="Message"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="form-control" onClick={handleFormSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
