import React, { Component } from "react";
import "./RegisterPage.scss";

class RegisterPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    flashErrors: [], // TODO: Fetch flash errors from API if needed
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      country,
      phoneNumber,
      companyName,
      email,
      password,
      confirmPassword,
      agreeTerms,
    } = this.state;

    // TODO: Implement registration logic (call API)
    console.log("Registering user", {
      firstName,
      lastName,
      country,
      phoneNumber,
      companyName,
      email,
      password,
      confirmPassword,
      agreeTerms,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      country,
      phoneNumber,
      companyName,
      email,
      password,
      confirmPassword,
      agreeTerms,
      flashErrors,
    } = this.state;

    return (
      <div className="register-page">

        <div className="wrapper">


          {flashErrors.length > 0 &&
            flashErrors.map((error, index) => (
              <div key={index} className="alert alert-danger" role="alert">
                {error}
              </div>
            ))}
          <form className="registration-form" onSubmit={this.handleSubmit}>
            <div className="logo">
              <a href="/">
                <img
                  loading="lazy"
                  src="/assets/logo.png"
                  alt="app logo"
                />
              </a>
            </div>

            <h1 className="form-title">Register</h1>

            <div className="row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="country-row">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={this.handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={this.handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
              required
            />

            <div className="agreements">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={this.handleChange}
              />
              <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
            </div>

            <button type="submit" className="btn">
              Register
            </button>

            <hr />

            <div className="login">
              <p className="ou">Already a member ?</p>
              <a href="/login">Se connecter</a>
            </div>
          </form>
        </div>
        <div className="image-section">
          <img
            loading="lazy"
            className="background-image"
            src="/assets/login-2.jpg"
            alt="Register background"
          />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
