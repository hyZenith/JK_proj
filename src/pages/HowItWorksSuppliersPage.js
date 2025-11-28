import React from "react";
import { Link } from "react-router-dom";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./HowItWorksSuppliersPage.scss";

const HowItWorksSuppliersPage = () => {
    return (
        <InfoPagesLayout activePage="how-it-works-suppliers">
            <div className="how-it-works-suppliers__container">
                <h1 className="how-it-works-suppliers__title">How It Works for Suppliers</h1>

                <div className="how-it-works-suppliers__content">
                    <section className="how-it-works-suppliers__section">
                        <h2>Step 1: Create Your Profile</h2>
                        <p>
                            Register your business and create a comprehensive profile showcasing
                            your products, capabilities, and certifications.
                        </p>
                    </section>

                    <section className="how-it-works-suppliers__section">
                        <h2>Step 2: List Your Products</h2>
                        <p>
                            Upload your product catalog with detailed descriptions, images, and
                            specifications to attract potential buyers.
                        </p>
                    </section>

                    <section className="how-it-works-suppliers__section">
                        <h2>Step 3: Receive Inquiries</h2>
                        <p>
                            Get direct inquiries from verified buyers looking for your products.
                            Respond quickly to win more business.
                        </p>
                    </section>

                    <section className="how-it-works-suppliers__section">
                        <h2>Step 4: Expand Globally</h2>
                        <p>
                            Connect with international buyers, build your reputation, and grow
                            your export business with Go Trade Türkiye.
                        </p>
                    </section>
                </div>

                <div className="how-it-works-suppliers__cta">
                    <h3>Ready to expand your business?</h3>
                    <Link to="/become-member" className="how-it-works-suppliers__cta-button">
                        Become a Member
                    </Link>
                </div>
            </div>
        </InfoPagesLayout>
    );
};

export default HowItWorksSuppliersPage;
