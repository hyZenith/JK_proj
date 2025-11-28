import React from "react";
import { Link } from "react-router-dom";
import "./InfoPagesLayout.scss";

const InfoPagesLayout = ({ activePage, children }) => {
  return (
    <div className="info-pages-layout">
      <aside className="info-pages-layout__sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-nav__section">
            <h3 className="sidebar-nav__heading">For buyers</h3>
            <ul className="sidebar-nav__list">
              <li className={`sidebar-nav__item ${activePage === "how-it-works-buyers" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/how-it-works">How it works</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "testimonials" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/testimonials">Testimonials</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "post-requirement" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/post-requirement">Post a requirement</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "search-suppliers" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/search-suppliers">Search suppliers</Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-nav__section">
            <h3 className="sidebar-nav__heading">For suppliers</h3>
            <ul className="sidebar-nav__list">
              <li className={`sidebar-nav__item ${activePage === "how-it-works-suppliers" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/suppliers/how-it-works">How it works</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "membership-pricing" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/membership-pricing">Membership Pricing</Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-nav__section">
            <h3 className="sidebar-nav__heading">Resources</h3>
            <ul className="sidebar-nav__list">
              <li className={`sidebar-nav__item ${activePage === "help-support" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/help-support">Help & support</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "exhibitions" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/exhibitions">Exhibitions in Türkiye</Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-nav__section">
            <h3 className="sidebar-nav__heading">Company</h3>
            <ul className="sidebar-nav__list">
              <li className={`sidebar-nav__item ${activePage === "about" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/about">About</Link>
              </li>
              <li className={`sidebar-nav__item ${activePage === "contact" ? "sidebar-nav__item--active" : ""}`}>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="info-pages-layout__main">
        {children}
      </main>
    </div>
  );
};

export default InfoPagesLayout;
