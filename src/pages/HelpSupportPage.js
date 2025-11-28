import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./HelpSupportPage.scss";

const HelpSupportPage = () => {
    const faqs = [
        {
            question: "How do I register as a supplier?",
            answer: "Click on 'Become a Member' and fill out the registration form with your business details. Our team will verify your information within 24-48 hours."
        },
        {
            question: "Is there a fee to post requirements?",
            answer: "No, posting requirements is completely free for buyers. You can post unlimited requirements and receive quotes from verified suppliers."
        },
        {
            question: "How do I contact a supplier?",
            answer: "You can contact suppliers directly through their profile page or request a quote. Premium members get priority responses."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards, PayPal, and bank transfers for membership subscriptions. Individual transactions are handled directly between buyers and suppliers."
        }
    ];

    return (
        <InfoPagesLayout activePage="help-support">
            <div className="help-support__container">
                <h1 className="help-support__title">Help & Support</h1>
                <p className="help-support__subtitle">
                    Find answers to common questions or get in touch with our team
                </p>

                <div className="help-support__content">
                    <section className="help-support__section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="help-support__faqs">
                            {faqs.map((faq, index) => (
                                <div key={index} className="help-support__faq">
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="help-support__section">
                        <h2>Contact Support</h2>
                        <div className="help-support__contact">
                            <div className="help-support__contact-item">
                                <h4>Email Support</h4>
                                <p><a href="mailto:support@gotradetürkiye.com">support@gotradetürkiye.com</a></p>
                            </div>
                            <div className="help-support__contact-item">
                                <h4>Phone Support</h4>
                                <p><a href="tel:+902121234567">+90 212 123 45 67</a></p>
                            </div>
                            <div className="help-support__contact-item">
                                <h4>Business Hours</h4>
                                <p>Monday - Friday: 9:00 AM - 6:00 PM (GMT+3)</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </InfoPagesLayout>
    );
};

export default HelpSupportPage;
