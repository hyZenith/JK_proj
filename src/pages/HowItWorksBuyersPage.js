import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./HowItWorksBuyersPage.scss";

const HowItWorksBuyersPage = () => {
  return (
    <InfoPagesLayout activePage="how-it-works-buyers">
      <div className="how-it-works-buyers__content">
        <h1 className="how-it-works-buyers__title">How it works</h1>
        <p className="how-it-works-buyers__subtitle">
          Invest with confidence with Go Trade Türkiye
        </p>

        <p className="how-it-works-buyers__intro">
          Effortlessly access a curated network of trusted suppliers in Türkiye. Go Trade Türkiye offers verified supplier
          profiles across diverse industries, giving investors streamlined access to the Turkish market's top service providers. Find detailed supplier insights, connect directly, and make informed investment decisions with confidence. Our platform combines intelligent matching with tailored solutions, ensuring you find the ideal partners
          for your projects and growth ambitions.
        </p>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Step-by-Step Guide
          </h2>
          <p className="how-it-works-buyers__section-text">
            Getting started is easy. Simply register, define your project needs, and explore Go Trade Türkiye's extensive
            supplier directory. Use filters to refine by industry, certifications, and project scale. With our step-by-step guidance, sourcing the right partners for your investment projects has never been more efficient.
          </p>
        </section>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Verified Supplier Benefits
          </h2>
          <p className="how-it-works-buyers__section-text">
            Gain peace of mind with Go Trade Türkiye's verified suppliers. Each listing undergoes thorough quality checks,
            ensuring you connect only with reputable, reliable suppliers in Türkiye. Confidence in quality and trust is central to our service.
          </p>
        </section>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Personalized Recommendations
          </h2>
          <p className="how-it-works-buyers__section-text">
            We personalize your experience. Our advanced algorithm analyzes your project requirements and browsing
            history to recommend the most suitable suppliers, saving you time and helping you make informed sourcing
            decisions effortlessly.
          </p>
        </section>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Dedicated Support
          </h2>
          <p className="how-it-works-buyers__section-text">
            Our expert support team is here to guide you. From account setup to advanced search, our dedicated team
            provides seamless assistance, ensuring you make the most of your experience and find the ideal partners.
          </p>
        </section>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Investment Insights
          </h2>
          <p className="how-it-works-buyers__section-text">
            Stay informed with exclusive access to market trends, investment opportunities, and sector-specific data. Our
            insights equip you with the latest knowledge, giving you an edge in selecting high-potential suppliers and navigating the Turkish market.
          </p>
        </section>

        <section className="how-it-works-buyers__section">
          <h2 className="how-it-works-buyers__section-title">
            Direct Communication Channels
          </h2>
          <p className="how-it-works-buyers__section-text">
            Connecting is simple with Go Trade Türkiye. Our direct messaging option allows you to communicate instantly
            with suppliers, ask questions, and negotiate terms, making your sourcing process seamless and efficient.
          </p>
        </section>
      </div>
    </InfoPagesLayout>
  );
};

export default HowItWorksBuyersPage;
