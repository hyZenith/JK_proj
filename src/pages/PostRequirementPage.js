import React, { useState } from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./PostRequirementPage.scss";
import flagImage from "../flag.png";

const PostRequirementPage = () => {
  const [formData, setFormData] = useState({
    CompanyName: "",
    FirstName: "",
    LastName: "",
    PhoneCode: "",
    PhoneNumber: "",
    Email: "",
    Country: "Turkey",
    Industry: "",
    DefineProject: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <InfoPagesLayout activePage="post-requirement">
      <div className="post-requirement__container">
        <h1 className="post-requirement__title">Post a requirement</h1>
        <p className="post-requirement__subtitle">
          Submit Your Sourcing Needs. Let Us Find Your Perfect Partner.
        </p>
        <p className="post-requirement__intro">
          Ready to make your sourcing process simpler? Post your requirement
          with Go Trade Türkiye, and let qualified suppliers come to you.
          Customize your post to detail specifications, budget, timeline, and
          expectations so that only the most qualified suppliers respond. From
          initial interest to contract finalization, we'll help facilitate a
          productive process, so you get the right fit for your project faster
          and more efficiently.
        </p>

        <form className="post-requirement__form" onSubmit={handleSubmit}>
          <div className="post-requirement__form-row post-requirement__form-row--two-col">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Company Name
            </label>
            <input
              type="text"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
              className="post-requirement__input"
            />
          </div>

          <div className="post-requirement__form-row post-requirement__form-row--full-name">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Full Name
            </label>

            <div className="post-requirement__form-col">
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="post-requirement__input"
              />

              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="post-requirement__input"
              />
            </div>
          </div>

          <div className="post-requirement__form-row post-requirement__form-row--split">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Telephone
            </label>

            <div className="post-requirement__form-col">
              <input
                type="text"
                name="PhoneCode"
                value={formData.PhoneCode}
                onChange={handleChange}
                required
                placeholder="Code"
                className="post-requirement__input"
              />

              <input
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className="post-requirement__input"
              />
            </div>
          </div>

          <div className="post-requirement__form-row">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Email
              Address
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="post-requirement__input"
            />
          </div>

          <div className="post-requirement__form-row">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Country /
              Region
            </label>
            <div className="post-requirement__country-input-wrapper">
              <input
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                required
                className="post-requirement__input post-requirement__input--with-flag"
                style={{ backgroundImage: `url(${flagImage})` }}
              />
            </div>
          </div>

          <div className="post-requirement__form-row">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Industry
              Sector
            </label>
            <select
              name="Industry"
              value={formData.Industry}
              onChange={handleChange}
              required={true}
              className="post-requirement__select"
            >
              <option value="">Select the specified industry</option>
              <option value="textiles">Textiles & Apparel</option>
              <option value="food">Food & Beverages</option>
              <option value="electronics">Electronics</option>
              <option value="machinery">Machinery</option>
              <option value="automotive">Automotive</option>
              <option value="construction">Construction</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="post-requirement__form-row">
            <label className="post-requirement__label">
              <span className="post-requirement__required">*</span> Define Your
              Project
            </label>
            <textarea
              name="DefineProject"
              value={formData.DefineProject}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Clearly define your project, budget, and goals ..."
              className="post-requirement__textarea"
            />
          </div>

          <div className="post-requirement__form-actions">
            <button type="submit" className="post-requirement__submit">
              Submit Your Requirement
            </button>
          </div>
        </form>
      </div>
    </InfoPagesLayout>
  );
};

export default PostRequirementPage;
