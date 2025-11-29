import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <InfoPagesLayout activePage="about">
      <div className="about__container">
        <h1 className="about__title">About </h1>
        <p className="about__subtitle">
          Go Trade Türkiye, a flagship initiative of Go Trade Agency, is
          dedicated to connecting international investors with Turkish suppliers
          through a reliable, curated platform. We aim to simplify the trade
          process, promote Türkiye as a business destination, and support
          suppliers and investors with comprehensive services that make
          international trade accessible, transparent, and efficient. Discover
          how Go Trade Türkiye can become your partner in growth and global
          expansion.
        </p>

        <section className="about__section">
          <h2>Our Mission</h2>
          <p>
            At Go Trade Türkiye, our mission is clear: to facilitate and promote
            international trade by simplifying the process of finding Turkish
            suppliers and establishing business-to-business connections. We are
            committed to helping businesses, both small and large, source
            high-quality products, explore new markets, and foster long-lasting
            partnerships within Türkiye.
          </p>
        </section>

        <section className="about__section">
          <h2>Your Business Partner</h2>
          <p>
            Türkiye is known for its rich history, diverse culture, and a
            burgeoning economy. Itʼs a country that thrives on innovation,
            quality, and a strong entrepreneurial spirit. Go Trade Türkiye
            bridges the gap between global businesses and the vast network of
            Turkish suppliers, enabling you to access a wide range of products,
            services, and opportunities.
          </p>
        </section>

        <div className="about__divider">
          <h1 className="about__divider-h1"> What sets us apart</h1>
        </div>

        <section className="about__section">
          <h2>Comprehensive Directory</h2>
          <p>
            Our online trading portal boasts an extensive directory of Turkish
            suppliers covering various industries, from textiles and
            manufacturing to agriculture and technology. Whether you are looking
            for raw materials, finished products, or business services, we have
            you covered.
          </p>
        </section>
        <section className="about__section">
          <h2>User-Friendly Platform</h2>
          <p>
            Weʼve designed our website with simplicity and ease of use in mind.
            Our intuitive interface ensures that you can quickly search for
            suppliers, browse products, and connect with potential partners
            without any hassle.
          </p>
        </section>
        <section className="about__section">
          <h2>Verified Suppliers</h2>
          <p>
            We take quality seriously. To ensure a high level of trust and
            reliability, we rigorously vet and verify our listed suppliers, so
            you can have confidence in the businesses you choose to work with.
          </p>
        </section>
        <section className="about__section">
          <h2>Networking Opportunities </h2>
          <p>
            Go Trade Türkiye not only helps you find suppliers but also offers a
            platform for networking, knowledge sharing, and collaboration.
            Connect with like-minded businesses, attend industry events, and
            stay updated on the latest market trends.
          </p>
        </section>
        <section className="about__section">
          <h2>Dedicated Support</h2>
          <p>
            Our customer support team is always ready to assist you with any
            inquiries or concerns. We are here to make your trading experience
            as smooth as possible.
          </p>
        </section>
      </div>
    </InfoPagesLayout>
  );
};

export default AboutPage;
