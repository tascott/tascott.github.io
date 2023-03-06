import React, { useState } from "react";
import "./style.css";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isActive, setIsActive] = useState(false);

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

    const newFormData = new FormData();
    console.log(formData)
    Object.entries(formData).forEach(([key, value]) => {
      console.log(key, value)
      newFormData.append(key, value);
    });

    fetch("https://getform.io/f/e7cf1f45-4768-4476-9f21-f2591c84a06b", {
      method: "POST",
      body: newFormData
    }).then(response => console.log(response))
      .then(function () {
        // Add a class to the submit button to show a success message
        setIsActive(true);
        setFormData({ name: "", message: "" })
      });
  };


  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
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
          <button className={isActive ? 'form-control submit-success' : 'form-control'} type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
