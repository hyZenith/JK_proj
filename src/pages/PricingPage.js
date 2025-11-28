import React, { Component } from "react";
import "./PricingPage.scss";
import AppConst from "../AppConst";

class PricingPage extends Component {
    state = {
        plans: [], // Data will be fetched asynchronously
    };

    featureLabels = [
        "Product Posting",
        "Receive & respond to inquiries",
        "Annual Ads spent",
        "Respond to RFQs",
        "Exposure",
        "Profile",
        "Social Media Exposure",
        "Off-page SEO",
        "Google Ads",
    ];

    async componentDidMount() {
        const plans = await this.fetchPlans();
        this.setState({ plans });
    }

    // TODO: Fetch pricing data asynchronously
    fetchPlans = async () => {
        // Simulate an API call with a delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        title: "Basic",
                        price: "TL 0,000/year",
                        button: "Select",
                        subText: "Free",
                        features: [
                            "Unlimited",
                            "✖",
                            "0,000 TL",
                            "N/A",
                            "0 days",
                            "Limited",
                            "✖",
                            "✖",
                            "✖",
                        ],
                    },
                    {
                        title: "Standard",
                        price: "$49/month",
                        subText: "Commit annually",
                        button: "Select & Pay",
                        highlight: true,
                        offer: "Special Offer",
                        features: [
                            "Unlimited",
                            "✔",
                            "11,999 TL",
                            "Unlimited",
                            "365 days",
                            "Complete Profile",
                            "✔",
                            "✔",
                            "✖",
                        ],
                    },
                    {
                        title: "Premium",
                        price: "$99/month",
                        subText: "Commit annually",
                        button: "Select & Pay",
                        features: [
                            "Unlimited",
                            "✔",
                            "22,999 TL",
                            "Unlimited",
                            "365 days",
                            "Complete Profile",
                            "✔",
                            "✔",
                            "✔",
                        ],
                    },
                ]);
            }, 1000); // simulate 1s network delay
        });
    };


    // TODO: Format number with commas
    addCommasToNumber = (num) => {
        return num?.toLocaleString() ?? "";
    };

    // TODO: Handle "Contact Sales" button click
    handleContactSales = (pricing) => {
        console.log("Contact Sales clicked for:", pricing);
    };

    render() {
        const { plans } = this.state;

        return (
            <div className="container">

                <div className="heading">
                    <h1>Join the {AppConst.brandName} <br /> Community Today</h1>
                    <p><b>We are trusted by +100k businesses worldwide</b></p>
                    <p className="blue">Get listed and grow your business now !</p>
                </div>

                <div className="pricing-container">
                    <table className="pricing-table">
                        <thead>
                            <tr>
                                <th className="feature-header"></th>
                                {plans.map((plan, index) => (
                                    <th key={index} className={plan.highlight ? "active-plan" : ""}>
                                        {plan.offer && <div className="badge">{plan.offer}</div>}
                                        <h3>{plan.title}</h3>
                                        <p className="price">{plan.price}</p>
                                        {plan.subText && <p className="sub-text">{plan.subText}</p>}
                                        <button className="select-btn">{plan.button}</button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.featureLabels.map((label, i) => (
                                <tr key={i}>
                                    <td className="feature-label">{label}</td>
                                    {plans.map((plan, j) => (
                                        <td key={j} className={plan.highlight ? "active-plan" : ""}>
                                            {plan.features[i]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default PricingPage;
