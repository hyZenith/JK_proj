import React from "react";
import "./AddCompanyPricingPage.scss";
import { FaCheck, FaTimes } from "react-icons/fa";

const AddCompanyPricingPage = ({ router }) => {
    const handleSelectPlan = (planId) => {
        router?.navigate(`/become-member?plan=${planId}`);
    };

    return (
        <div className="add-company-pricing-page">
            <div className="pricing-hero">
                <h1 className="hero-title">
                    Join the Go Trade Türkiye<br />
                    Community Today!
                </h1>
                <p className="hero-subtitle">
                    We are trusted by <span className="highlight">+100k businesses</span> worldwide.
                </p>
                <p className="hero-cta">Get listed and grow your business now!</p>
            </div>

            <div className="pricing-container">
                <div className="pricing-card">
                    {/* Table Header */}
                    <div className="pricing-row pricing-header">
                        <div className="pricing-cell cell-feature"></div>
                        <div className="pricing-cell cell-free">
                            <div className="plan-info">
                                <span className="plan-title">Free</span>
                                <button
                                    className="plan-button dark"
                                    onClick={() => handleSelectPlan('free')}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                        <div className="pricing-cell cell-standard">
                            <div className="special-badge">Special Offer</div>
                            <div className="plan-info">
                                <span className="plan-title blue">Standard</span>
                                <span className="plan-price">TL 49,000/month</span>
                                <span className="plan-commit">Commit annually</span>
                                <button
                                    className="plan-button dark"
                                    onClick={() => handleSelectPlan('standard')}
                                >
                                    Select & Pay
                                </button>
                            </div>
                        </div>
                        <div className="pricing-cell cell-premium">
                            <div className="plan-info">
                                <span className="plan-title">Premium</span>
                                <span className="plan-price">TL 79,000/month</span>
                                <span className="plan-commit">Commit annually</span>
                                <button
                                    className="plan-button dark"
                                    onClick={() => handleSelectPlan('premium')}
                                >
                                    Select & Pay
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Platform Features Header */}
                    <div className="pricing-row section-header">
                        <div className="pricing-cell cell-feature">Platform features</div>
                        <div className="pricing-cell cell-free"></div>
                        <div className="pricing-cell cell-standard"></div>
                        <div className="pricing-cell cell-premium"></div>
                    </div>

                    {/* Feature Rows */}
                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Product Posting</div>
                        <div className="pricing-cell cell-free">Unlimited</div>
                        <div className="pricing-cell cell-standard">Unlimited</div>
                        <div className="pricing-cell cell-premium">Unlimited</div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Receive & respond to inquiries</div>
                        <div className="pricing-cell cell-free"><FaTimes className="icon-x" /></div>
                        <div className="pricing-cell cell-standard"><FaCheck className="icon-check" /></div>
                        <div className="pricing-cell cell-premium"><FaCheck className="icon-check" /></div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Annual Ads spent</div>
                        <div className="pricing-cell cell-free">0,000 TL</div>
                        <div className="pricing-cell cell-standard">11,999 TL</div>
                        <div className="pricing-cell cell-premium">22,999TL</div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Respond to RFQs</div>
                        <div className="pricing-cell cell-free">N/A</div>
                        <div className="pricing-cell cell-standard">Unlimited</div>
                        <div className="pricing-cell cell-premium">Unlimited</div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Exposure</div>
                        <div className="pricing-cell cell-free">0 days</div>
                        <div className="pricing-cell cell-standard">365 days</div>
                        <div className="pricing-cell cell-premium">365 days</div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Profile</div>
                        <div className="pricing-cell cell-free">Limited</div>
                        <div className="pricing-cell cell-standard">Complete Profile</div>
                        <div className="pricing-cell cell-premium">Complete Profile</div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Social Media Exposure</div>
                        <div className="pricing-cell cell-free"><FaTimes className="icon-x" /></div>
                        <div className="pricing-cell cell-standard"><FaCheck className="icon-check" /></div>
                        <div className="pricing-cell cell-premium"><FaCheck className="icon-check" /></div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Off-page SEO</div>
                        <div className="pricing-cell cell-free"><FaTimes className="icon-x" /></div>
                        <div className="pricing-cell cell-standard"><FaCheck className="icon-check" /></div>
                        <div className="pricing-cell cell-premium"><FaCheck className="icon-check" /></div>
                    </div>

                    <div className="pricing-row">
                        <div className="pricing-cell cell-feature">Google Ads</div>
                        <div className="pricing-cell cell-free"><FaTimes className="icon-x" /></div>
                        <div className="pricing-cell cell-standard"><FaTimes className="icon-x" /></div>
                        <div className="pricing-cell cell-premium"><FaCheck className="icon-check" /></div>
                    </div>

                    {/* Bottom Button Row */}
                    <div className="pricing-row footer-row">
                        <div className="pricing-cell cell-feature"></div>
                        <div className="pricing-cell cell-free">
                            <button
                                className="plan-button blue"
                                onClick={() => handleSelectPlan('free')}
                            >
                                Select
                            </button>
                        </div>
                        <div className="pricing-cell cell-standard">
                            <button
                                className="plan-button blue"
                                onClick={() => handleSelectPlan('standard')}
                            >
                                Select & Pay
                            </button>
                        </div>
                        <div className="pricing-cell cell-premium">
                            <button
                                className="plan-button blue"
                                onClick={() => handleSelectPlan('premium')}
                            >
                                Select & Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyPricingPage;
