import React from "react";
import { Link } from "react-router-dom";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./HowItWorksSuppliersPage.scss";


const HowItWorksSuppliersPage = () => {
  return (
    <InfoPagesLayout activePage="how-it-works-suppliers">
      <div className="how-it-works-suppliers__content">
        <h1 className="how-it-works-suppliers__title">How it works</h1>
        <p className="how-it-works-suppliers__subtitle">
          Get noticed by international investors through Go Trade Türkiye.
        </p>

        <p className="how-it-works-suppliers__intro">
          Maximize your visibility with a complete profile, showcasing your
          services, certifications, and unique expertise. Verified suppliers
          enjoy enhanced credibility, building trust with buyers through direct
          communication channels for faster, more reliable connections.
        </p>
        <p className="how-it-works-suppliers__intro">
          Take advantage of our platformʼs built-in SEO to reach a broader
          audience, and gain insights with real-time analytics to adapt to
          market demands. Success stories from other suppliers highlight the
          value of building strong, lasting business partnerships through Go
          Trade Türkiye, where your growth is our priority
        </p>
    
        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Profile Creation and Setup
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Stand out with a professional profile. Begin by setting up a
            detailed profile that showcases your services, certifications, and
            past projects. Make a strong impression on potential buyers by
            highlighting what sets you apart, including high-quality images,
            descriptions, and any awards or recognitions that add credibility to
            your brand.
          </p>
        </section>

        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Verification and Trust-Building
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Boost buyer confidence with a verified profile. Through our simple
            verification process, your business can gain trusted status on Go
            Trade Türkiye, making you a preferred choice for buyers looking for
            reliability. Verified profiles also benefit from increased
            visibility, helping you connect with buyers more effectively.
          </p>
        </section>

        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Connecting with Buyers
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Direct connections drive stronger partnerships. Engage with
            potential buyers directly through our platformʼs messaging and
            calling features. By responding promptly and openly to inquiries,
            youʼll build trust and create meaningful business relationships,
            streamlining the negotiation and partnership process.
          </p>
        </section>

        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Visibility and SEO Benefits
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Expand your reach with enhanced visibility. Go Trade Türkiye is
            designed with search engine optimization in mind, helping your
            profile rank higher on both our platform and major search engines.
            This feature gives your business exposure not only within our
            directory but also across the web, attracting more potential buyers.
          </p>
        </section>

        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Industry Insights and Analytics
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Gain valuable insights into your profileʼs performance. Access
            analytics on views, clicks, and engagement to understand how buyers
            interact with your profile. These insights help you tailor your
            offerings and improve your profileʼs effectiveness, so you can
            better meet market demands.
          </p>
        </section>

        <section className="how-it-works-suppliers__section">
          <h2 className="how-it-works-suppliers__section-title">
            Support and Resources
          </h2>
          <p className="how-it-works-suppliers__section-text">
            Weʼre here to support your success. Our dedicated customer support
            team is ready to assist you with any questions, and we provide
            resources to help you make the most of Go Trade Türkiye. Whether you
            need guidance on profile optimization or tips on industry best
            practices, weʼre here to help.
          </p>
        </section>
      </div>
    </InfoPagesLayout>
  );
};

export default HowItWorksSuppliersPage;
