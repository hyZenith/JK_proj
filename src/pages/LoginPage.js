import React, { Component } from "react";
import "./LoginPage.scss";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    csrfToken: "fake_csrf_token", // TODO: Replace with real CSRF token fetch if needed
  };

  componentDidMount() {
    // TODO: Set last username if needed from localStorage or API
    // this.setState({ email: lastUsername });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, csrfToken } = this.state;
    // this.props.auth.authenticate(email, password).then((res) => {
    //   this.props.router.navigate("/");
    // })

     this.props.auth.demo(email, password).then((res) => {
      this.props.router.navigate("/");
    })


  };

  render() {
    const { email, password, error, csrfToken } = this.state;

    return (
      <div className="login-page">

        <div className="wrapper">
          {error && (
            <div className="alert alert-danger">{error.message}</div>
          )}
          <form className="formulaireConnexion" onSubmit={this.handleSubmit}>
            <input type="hidden" name="_csrf_token" value={csrfToken} />

            <div className="logo">
              <a href="/">
                <img
                  loading="lazy"
                  src="/assets/logo.png"
                  alt="app logo"
                />
              </a>
            </div>

            <h1 className="form-title">Se connecter</h1>

            <div className="fields">
              <input
                type="email"
                name="email"
                id="inputEmail"
                className="form-control input-field"
                placeholder="Your email address"
                autoComplete="email"
                required
                value={email}
                onChange={this.handleInputChange}
                autoFocus
              />

              <input
                type="password"
                name="password"
                id="inputPassword"
                className="form-control input-field"
                placeholder="Your password"
                autoComplete="current-password"
                required
                value={password}
                onChange={this.handleInputChange}
              />
            </div>

            <button type="submit">Connexion</button>

            <div className="forgotPassword">
              <a href="/forgot-password">Mot de passe oublié?</a>
            </div>

            <hr />

            <div className="register">
              <p className="ou">Not yet a GTT member ?</p>
              <a href="/register">Become a member</a>
            </div>

            <div className="quick-links">
              <a href="#">Conditions of use</a>
              <a href="#">Privacy policy</a>
              <a href="#">Help</a>
            </div>
          </form>
        </div>

        <div className="image-section">
          <img
            loading="lazy"
            className="background-image"
            src="/assets/login-1.jpg"
            alt="Login background"
          />
        </div>
      </div>
    );
  }
}

export default LoginPage;
