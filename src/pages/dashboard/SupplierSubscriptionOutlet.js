import React, { Component } from "react";
import "./SupplierSubscriptionOutlet.scss";

class SupplierSubscriptionOutlet extends Component {
  state = {
    subscriptions: [],
    selectedPlan: "Pro Plan", // Example: this would come from user profile or DB
    loading: true,
  };

  componentDidMount() {
    this.loadSubscriptions();
  }

  // Simulated API fetch
  fetchPricings = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: "Basic Plan",
            isPopular: false,
            sellCurrency: "$",
            sellPrice: 199,
            yearlyAdSprending: 5000,
            trafficAccelerator: false,
            productPostingLimit: 100,
            boostedAdsPerYear: 5,
            HomeSliderVisibilityMonthlyDuration: 1,
            BottomSliderVisibilityMonthlyDuration: 1,
            SubAccounts: 1,
            ReceiveAndRespondToInquiries: true,
            RespondRFQMonthlyLimit: null,
          },
          {
            name: "Pro Plan",
            isPopular: true,
            sellCurrency: "$",
            sellPrice: 499,
            yearlyAdSprending: 20000,
            trafficAccelerator: true,
            productPostingLimit: 500,
            boostedAdsPerYear: 20,
            HomeSliderVisibilityMonthlyDuration: 3,
            BottomSliderVisibilityMonthlyDuration: 3,
            SubAccounts: 5,
            ReceiveAndRespondToInquiries: true,
            RespondRFQMonthlyLimit: 50,
          },
          {
            name: "Enterprise Plan",
            isPopular: false,
            sellCurrency: "$",
            sellPrice: 999,
            yearlyAdSprending: 100000,
            trafficAccelerator: true,
            productPostingLimit: null, // unlimited
            boostedAdsPerYear: 100,
            HomeSliderVisibilityMonthlyDuration: 6,
            BottomSliderVisibilityMonthlyDuration: 6,
            SubAccounts: 20,
            ReceiveAndRespondToInquiries: true,
            RespondRFQMonthlyLimit: 200,
          },
        ]);
      }, 1000);
    });
  };

  loadSubscriptions = async () => {
    this.setState({ loading: true });
    const data = await this.fetchPricings();
    this.setState({ subscriptions: data, loading: false });
  };

  handleSelect = (planName) => {
    this.setState({ selectedPlan: planName });
    console.log("Selected plan:", planName);
    // You can call backend API to persist selection
  };

  renderFeature(label, value) {
    if (value === null) return null;
    return (
      <li>
        <span className="label">{label}</span>
        <span className="value">{value === true ? "✔️" : value === false ? "❌" : value}</span>
      </li>
    );
  }

  render() {
    const { subscriptions, selectedPlan, loading } = this.state;

    return (
      <div className="subscription-page">
        <h1>My Subscriptions</h1>

        {loading ? (
          <div className="loading">Loading subscriptions...</div>
        ) : (
          <div className="plans">
            {subscriptions.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card ${
                  selectedPlan === plan.name ? "active" : ""
                } ${plan.isPopular ? "popular" : ""}`}
                onClick={() => this.handleSelect(plan.name)}
              >
                {plan.isPopular && <div className="badge">Popular</div>}
                <h2>{plan.name}</h2>
                <p className="price">
                  {plan.sellCurrency}
                  {plan.sellPrice}
                </p>

                <ul className="features">
                  {this.renderFeature(
                    "Yearly Ad Spending",
                    `${plan.sellCurrency}${plan.yearlyAdSprending}`
                  )}
                  {this.renderFeature(
                    "Traffic Accelerator",
                    plan.trafficAccelerator
                  )}
                  {this.renderFeature(
                    "Product Posting Limit",
                    plan.productPostingLimit || "Unlimited"
                  )}
                  {this.renderFeature(
                    "Boosted Ads / Year",
                    plan.boostedAdsPerYear
                  )}
                  {this.renderFeature(
                    "Home Slider Visibility (months)",
                    plan.HomeSliderVisibilityMonthlyDuration
                  )}
                  {this.renderFeature(
                    "Bottom Slider Visibility (months)",
                    plan.BottomSliderVisibilityMonthlyDuration
                  )}
                  {this.renderFeature("Sub Accounts", plan.SubAccounts)}
                  {this.renderFeature(
                    "Receive Inquiries",
                    plan.ReceiveAndRespondToInquiries
                  )}
                  {this.renderFeature(
                    "Respond RFQs (monthly)",
                    plan.RespondRFQMonthlyLimit || "Unlimited"
                  )}
                </ul>

                <div className="actions">
                  {selectedPlan === plan.name ? (
                    <button className="selected-btn" disabled>
                      Current Plan
                    </button>
                  ) : (
                    <button className="select-btn">Select</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SupplierSubscriptionOutlet;
