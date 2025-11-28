import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./AboutPage.scss";

const AboutPage = () => {
    return (
        <InfoPagesLayout activePage="about">
            <div className="about__container">
                <h1 className="about__title">About Go Trade Türkiye</h1>

                <section className="about__section">
                    <h2>Our Mission</h2>
                    <p>
                        Go Trade Türkiye is dedicated to bridging the gap between international
                        buyers and Turkish suppliers. We provide a trusted platform that
                        facilitates meaningful business connections and drives global trade growth.
                    </p>
                </section>

                <section className="about__section">
                    <h2>Why Choose Us?</h2>
                    <div className="about__features">
                        <div className="about__feature">
                            <h3>🔍 Verified Suppliers</h3>
                            <p>All suppliers are thoroughly vetted to ensure quality and reliability.</p>
                        </div>
                        <div className="about__feature">
                            <h3>🌍 Global Reach</h3>
                            <p>Connect with buyers and suppliers from around the world.</p>
                        </div>
                        <div className="about__feature">
                            <h3>💼 Expert Support</h3>
                            <p>Our team provides dedicated support to help you succeed.</p>
                        </div>
                        <div className="about__feature">
                            <h3>📊 Market Insights</h3>
                            <p>Access valuable data and trends to make informed decisions.</p>
                        </div>
                    </div>
                </section>

                <section className="about__section">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2024, Go Trade Türkiye emerged from a vision to showcase
                        Turkey's manufacturing excellence to the world. We recognized the
                        immense potential of Turkish suppliers and the growing demand from
                        international buyers for quality products at competitive prices.
                    </p>
                    <p>
                        Today, we serve thousands of businesses across multiple industries,
                        facilitating millions of dollars in trade annually. Our platform
                        continues to evolve, incorporating the latest technology to make
                        international trade simpler, safer, and more efficient.
                    </p>
                </section>

                <section className="about__section">
                    <h2>Our Values</h2>
                    <ul className="about__values">
                        <li><strong>Integrity:</strong> We operate with transparency and honesty in all our dealings.</li>
                        <li><strong>Excellence:</strong> We strive for the highest standards in everything we do.</li>
                        <li><strong>Innovation:</strong> We continuously improve our platform to serve you better.</li>
                        <li><strong>Partnership:</strong> Your success is our success. We're in this together.</li>
                    </ul>
                </section>
            </div>
        </InfoPagesLayout>
    );
};

export default AboutPage;
