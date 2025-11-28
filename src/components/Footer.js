import React from "react";
import "./Footer.scss";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        {/* Logo */}
        <div className="footer__logo">
          <a href="/" aria-label="Go Trade Türkiye Home">
            <img
              loading="lazy"
              src="/assets/logo.png"
              alt="Go Trade Türkiye Logo"
            />
          </a>
        </div>

        {/* Content Row: Description + Menus */}
        <div className="footer__content-row">
          {/* Left: Description */}
          <div className="footer__description">
            <p className="footer__tagline">
              Creating impactful business connections.
            </p>
            <p className="footer__text">
              Easily search, explore, and connect with leading Turkish
              suppliers. Share your needs, and we'll guide you to the ideal
              partner to fuel your business growth with Go Trade Türkiye.
            </p>
          </div>

          {/* Right: Menu Grid - 4 Columns */}
          <div className="footer__menus">
            {/* For buyers */}
            <div className="footer__menu">
              <h6 className="footer__menu-title">For buyers</h6>
              <ul className="footer__menu-list">
                <li className="footer__menu-item">
                  <a href="/how-it-works">How it works</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/testimonials">Testimonials</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/post-requirement">Post a requirement</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/search-suppliers">Search suppliers</a>
                </li>
              </ul>
            </div>

            {/* For suppliers */}
            <div className="footer__menu">
              <h6 className="footer__menu-title">For suppliers</h6>
              <ul className="footer__menu-list">
                <li className="footer__menu-item">
                  <a href="/suppliers/how-it-works">How it works</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/membership-pricing">Membership Pricing</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer__menu">
              <h6 className="footer__menu-title">Resources</h6>
              <ul className="footer__menu-list">
                <li className="footer__menu-item">
                  <a href="/help-support">Help & support</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/exhibitions">Exhibitions in Türkiye</a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer__menu">
              <h6 className="footer__menu-title">Company</h6>
              <ul className="footer__menu-list">
                <li className="footer__menu-item">
                  <a href="/about">About</a>
                </li>
                <li className="footer__menu-item">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer__social">
          <a
            href="https://twitter.com"
            className="footer__social-link"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            className="footer__social-link"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            className="footer__social-link"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com"
            className="footer__social-link"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            className="footer__social-link"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer__copyright">
        <p>
          2024 - 2026 © Go Trade Türkiye - All rights reserved -{" "}
          <a href="/terms">Terms of Use</a> -{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
