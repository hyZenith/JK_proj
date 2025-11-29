import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./MembershipPricingPage.scss";

const MembershipPricingPage = () => {
  return (
    <InfoPagesLayout activePage="membership-pricing">
      <div className="membership-pricing__container">
        <h1 className="membership-pricing__title">Membership Pricing</h1>
        <p className="membership-pricing__subtitle">
          Choose from our Basic, Standard and Premium anual membership plans to
          gain access to all platform features, including SEO visibility, direct
          messaging, and with Premium Google Ads exposure. Select a plan that
          aligns with your growth goals and maximize your reach.
        </p>

        <section className="membership-pricing__section">
          <h2 className="membership-pricing__section-title">
            Membership Overview
          </h2>
          <p className="membership-pricing__section-text">
            Choose the right membership plan for your company. Whether you start
            with our Free plan to get introduced to the market, or opt for the
            Standard or Premium plans for enhanced visibility and advanced
            tools, each membership is designed to help you grow your presence in
            the Turkish market.
          </p>
        </section>
        <section className="membership-pricing__section">
          <h2 className="membership-pricing__section-title">
            Benefits Comparison Table
          </h2>
          <p className="membership-pricing__section-text">
            Compare the features and benefits across our membership plans. The
            Free plan offers basic exposure, while the Standard and Premium
            plans provide additional features like SEO optimization, direct
            messaging, and access to Google Ads. Decide which plan best suits
            your business needs
          </p>
        </section>

        <section className="membership-pricing__section">
          <h2 className="membership-pricing__section-title">
            Upgrade Encouragement{" "}
          </h2>
          <p className="membership-pricing__section-text">
            Unlock even more potential with our Standard and Premium plans.
            These options offer better exposure, advanced marketing tools, and
            direct access to investors and buyers. Elevate your business
            visibility and take advantage of additional promotional services.
          </p>
        </section>

        <section className="membership-pricing__section">
          <h2 className="membership-pricing__section-title">
            Quick Signup CTA
          </h2>
          <p className="membership-pricing__section-text">
            Get listed today! Select your membership plan and join the Go Trade
            Türkiye network. Whether you're starting with the Free plan or ready
            to upgrade, signing up is quick and easy. Start your journey toward
            growing your business in the Turkish market.
          </p>
        </section>
      </div>
      <button className="membership-pricing__add-company-button">
        Add your company
      </button>
    </InfoPagesLayout>
  );
};

export default MembershipPricingPage;
