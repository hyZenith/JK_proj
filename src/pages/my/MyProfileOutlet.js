import React, { Component } from "react";
import "./MyProfileOutlet.scss";

export default class MyProfileOutlet extends Component {
  state = {
    loading: true,
    editing: false,
    profile: null,
    formData: {},
  };

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    // Simulated API fetch
    const fakeProfile = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          businessName: "Acme Corp",
          businessType: "Retail",
          industry: "Electronics",
          website: "https://acmecorp.com",
          phone: "+49 123 456789",
          address: "123 Main Street, Berlin, Germany",
          contactPerson: "John Doe",
          email: "john.doe@acmecorp.com",
        });
      }, 1000);
    });

    this.setState({ profile: fakeProfile, formData: fakeProfile, loading: false });
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleCancel = () => {
    this.setState((prev) => ({
      editing: false,
      formData: prev.profile,
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      formData: { ...prev.formData, [name]: value },
    }));
  };

  handleSave = async () => {
    const { formData } = this.state;

    // Simulate API call
    const success = await new Promise((resolve) => {
      setTimeout(() => resolve(Math.random() > 0.1), 1000);
    });

    if (!success) {
      alert("❌ Failed to save profile (fake API error).");
      return;
    }

    this.setState({ profile: formData, editing: false });
    alert("✅ Profile saved successfully!");
  };

  renderField(label, name, value, editable = false) {
    const { editing, formData } = this.state;

    return (
      <div className="field">
        <label>{label}:</label>
        {editing && editable ? (
          <input
            type="text"
            name={name}
            value={formData[name] || ""}
            onChange={this.handleChange}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    );
  }

  render() {
    const { loading, profile, editing } = this.state;

    if (loading) return <p>Loading profile...</p>;
    if (!profile) return <p>Profile not found.</p>;

    return (
      <div className="buyer-profile-page">
        <h1>My Profile</h1>

        <div className="profile-card">
          <h2>Company Information</h2>
          {this.renderField("Company Name", "businessName", profile.businessName, true)}
          {this.renderField("Company Type", "businessType", profile.businessType, true)}
          {this.renderField("Industry", "industry", profile.industry, true)}
          {this.renderField("Website", "website", profile.website, true)}
          {this.renderField("Phone", "phone", profile.phone, true)}
          {this.renderField("Address", "address", profile.address, true)}

          <h2>Contact Person</h2>
          {this.renderField("Name", "contactPerson", profile.contactPerson, true)}
          {this.renderField("Email", "email", profile.email, true)}

          <div className="actions">
            {editing ? (
              <>
                <button className="cancel" onClick={this.handleCancel}>
                  Cancel
                </button>
                <button className="save" onClick={this.handleSave}>
                  Save
                </button>
              </>
            ) : (
              <button className="edit" onClick={this.handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}