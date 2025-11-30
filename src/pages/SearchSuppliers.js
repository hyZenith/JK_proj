import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./SearchSuppliers.scss";

const SearchSuppliers = () => {
  return (
    <InfoPagesLayout activePage="search-suppliers">
      <div className="search-suppliers__container">
        <h1 className="search-suppliers__title">Search smarter, not harder</h1>
        <p className="search-suppliers__subtitle">
          This is how you find the right supplier faster and more efficiently.
        </p>

        <p className="search-suppliers__intro">
          Finding the right supplier is the first step to a successful project,
          and Go Trade Türkiye makes this easy. Use our advanced filter to
          search across industries, service types, and certifications to locate
          suppliers who meet your exact requirements. Each supplier profile
          provides detailed information, so you can make quick, informed
          decisions.{" "}
        </p>
      </div>
      <div className="search-suppliers__filters-section">
        <div className="search-suppliers__filters-content">
          <h2 className="search-suppliers__filters-title">
            Ready to take your business to the next level?
          </h2>
          <div className="search-suppliers__search-wrapper">
            <input
              id="search"
              type="search"
              className="search-suppliers__filters-input"
              placeholder="Search suppliers ..."
            />
            <img
              className="search-suppliers__search-icon"
              src="/assets/search.png"
              alt="search icon"
            />
          </div>
        </div>
      </div>

      <div className="search-suppliers__browseProduct">
        <div className="search-suppliers__browseProduct-content">
          <div className="search-suppliers__browseProduct-text">
            <h2 className="search-suppliers__browseProduct-title">
              Make quick informed decisions
            </h2>
            <p className="search-suppliers__browseProduct-description">
              With our verified suppliers and easy access to contact options,
              you're just a few clicks away from your next valuable business
              partnership.
            </p>
            <button className="search-suppliers__browseProduct-button">
              Browse all products
            </button>
          </div>
          <div className="search-suppliers__browseProduct-image">
            <img src="/assets/photo4.jpg" alt="browse products" />
          </div>
        </div>
      </div>
    </InfoPagesLayout>
  );
};

export default SearchSuppliers;
