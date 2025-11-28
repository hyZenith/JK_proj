import React, { useState } from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./ContactPage.scss";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                    Have questions? We'd love to hear from you.
                </p>

                <div className="contact__content">
                    <div className="contact__info">
                        <h2>Get in Touch</h2>

                        <div className="contact__info-item">
                            <h3>📧 Email</h3>
                            <p><a href="mailto:info@gotradetürkiye.com">info@gotradetürkiye.com</a></p>
                        </div>

                        <div className="contact__info-item">
                            <h3>📞 Phone</h3>
                            <p><a href="tel:+902121234567">+90 212 123 45 67</a></p>
                        </div>

                        <div className="contact__info-item">
                            <h3>📍 Address</h3>
                            <p>
                                Levent Mahallesi<br />
                                Büyükdere Caddesi No: 123<br />
                                34330 Beşiktaş, Istanbul<br />
                                Türkiye
                            </p>
                        </div>

                        <div className="contact__info-item">
                            <h3>🕒 Business Hours</h3>
                            <p>
                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                Saturday: 10:00 AM - 4:00 PM<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>

                    <form className="contact__form" onSubmit={handleSubmit}>
                        <div className="contact__form-group">
                            <label htmlFor="name">Your Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="email">Your Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Tell us more about your inquiry..."
                            />
                        </div>

                        <button type="submit" className="contact__submit">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </InfoPagesLayout>
    );
};

export default ContactPage;
