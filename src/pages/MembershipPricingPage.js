import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./MembershipPricingPage.scss";

const MembershipPricingPage = () => {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            period: "Forever",
            features: [
                "Company Profile",
                "Up to 10 Products",
                "Basic Support",
                "Search Visibility"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Professional",
            price: "$99",
            period: "per month",
            features: [
                "Everything in Basic",
                "Unlimited Products",
                "Priority Support",
                "Featured Listing",
                "Analytics Dashboard",
                "Lead Notifications"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "Contact us",
            features: [
                "Everything in Professional",
                "Dedicated Account Manager",
                "Custom Integration",
                "API Access",
                "White-label Options",
                "Premium Placement"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <InfoPagesLayout activePage="membership-pricing">
            <div className="membership-pricing__container">
                <h1 className="membership-pricing__title">Membership Pricing</h1>
                <p className="membership-pricing__subtitle">
                    Choose the perfect plan to grow your business
                </p>

                <div className="membership-pricing__plans">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`membership-pricing__plan ${plan.popular ? "membership-pricing__plan--popular" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="membership-pricing__badge">Most Popular</div>
                            )}
                            <h3 className="membership-pricing__plan-name">{plan.name}</h3>
                            <div className="membership-pricing__price">
                                <span className="membership-pricing__price-amount">{plan.price}</span>
                                <span className="membership-pricing__price-period">{plan.period}</span>
                            </div>
                            <ul className="membership-pricing__features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <button className="membership-pricing__cta">{plan.cta}</button>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPagesLayout>
    );
};

export default MembershipPricingPage;
