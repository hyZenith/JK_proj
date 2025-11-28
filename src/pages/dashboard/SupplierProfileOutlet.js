// SupplierProfileOutlet.js
import React, { Component } from "react";
import "./SupplierProfileOutlet.scss";
import { FaCross, FaMinus } from "react-icons/fa";

class SupplierProfileOutlet extends Component {
  state = {
    avatar: null,
    shortDescription: "",
    description: "",
    industries: [],
    newIndustry: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
    website: "",
    phone: "",
    location: "",
  };

  handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        avatar: URL.createObjectURL(file),
      });
    }
  };

  removeAvatar = () => {
    this.setState({ avatar: null });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSocialChange = (e) => {
    this.setState({
      socialLinks: {
        ...this.state.socialLinks,
        [e.target.name]: e.target.value,
      },
    });
  };

  addIndustry = () => {
    const { newIndustry, industries } = this.state;
    if (newIndustry.trim() && !industries.includes(newIndustry.trim())) {
      this.setState({
        industries: [...industries, newIndustry.trim()],
        newIndustry: "",
      });
    }
  };

  removeIndustry = (industry) => {
    this.setState({
      industries: this.state.industries.filter((i) => i !== industry),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", this.state);
    // send data to backend
  };

  render() {
    const {
      avatar,
      shortDescription,
      description,
      industries,
      newIndustry,
      socialLinks,
      website,
      phone,
      location,
    } = this.state;

    return (
      <div className="supplier-profile">
        <form onSubmit={this.handleSubmit} className="profile-form">
          <div className="form-group avatar-upload">
            <label>Avatar</label>
            <div className="avatar-dropzone">
              {avatar ? (
                <div className="avatar-preview">
                  <img src={avatar} alt="Avatar preview" />
                  <button type="button" onClick={this.removeAvatar}>
                    <FaMinus />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.handleAvatarChange}
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={shortDescription}
              onChange={this.handleInputChange}
              placeholder="Short description"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Full description"
            />
          </div>

          <div className="form-group industries">
            <label>Industries</label>
            <div className="industry-input">
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => this.setState({ newIndustry: e.target.value })}
                placeholder="Add industry"
              />
              <button type="button" onClick={this.addIndustry}>
                Add
              </button>
            </div>
            <div className="chips">
              {industries.map((industry) => (
                <div key={industry} className="chip">
                  {industry}
                  <span onClick={() => this.removeIndustry(industry)}>×</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group social-links">
            <label>Social Media Links</label>
            <input
              type="text"
              name="facebook"
              value={socialLinks.facebook}
              onChange={this.handleSocialChange}
              placeholder="Facebook URL"
            />
            <input
              type="text"
              name="instagram"
              value={socialLinks.instagram}
              onChange={this.handleSocialChange}
              placeholder="Instagram URL"
            />
            <input
              type="text"
              name="linkedin"
              value={socialLinks.linkedin}
              onChange={this.handleSocialChange}
              placeholder="LinkedIn URL"
            />
            <input
              type="text"
              name="twitter"
              value={socialLinks.twitter}
              onChange={this.handleSocialChange}
              placeholder="Twitter URL"
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={this.handleInputChange}
              placeholder="Website URL"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
              placeholder="Phone number"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.handleInputChange}
              placeholder="Address"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default SupplierProfileOutlet;
