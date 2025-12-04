import React, { useState } from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./ContactPage.scss";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <InfoPagesLayout activePage="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__subtitle">
          Have questions or need personalized assistance? Contact our team at Go
          Trade Türkiye, where weʼre committed to providing exceptional support
          for all users, whether youʼre a supplier or an investor.
        </p>

        <p>
          Weʼre here to help you get the most out of Go Trade Türkiye. Reach us
          for inquiries.
        </p>

        <div className="contact__submit-section">
          <div className="contact__floating-wrapper">
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              autoComplete="email"
              className="contact__email-input"
            />
            <label htmlFor="contact-email" className="contact__email-label">
              Your email
            </label>
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Add your message here ..."
            className="contact__message-textarea"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="contact__submit-button"
          >
            Send
          </button>
        </div>
      </div>
    </InfoPagesLayout>
  );
};

export default ContactPage;