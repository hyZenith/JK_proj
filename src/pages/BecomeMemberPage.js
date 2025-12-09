import React from "react";
import "./BecomeMemberPage.scss";
import AppConst from "../AppConst";

export default class BecomeMemberPage extends React.Component {
    constructor(props) {
        super(props);

        this.selectedPlan = this.props.router.query["plan"];

        this.state = {
            companyName: '',
            vergiNumara: '',
            firstName: '',
            lastName: '',
            phoneCode: '',
            phoneNumber: '',
            emailAddress: '',
            cityRegion: 'Istanbul',
            industrySector: '',
            companyDescription: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submit
        this.validateEmail(this.state.emailAddress);

        if (!this.state.emailError) {
            const response = await fetch(AppConst.api(AppConst.becomeMember), {
                method: "POST",
                body: JSON.stringify({
                    companyName: this.state.companyName,
                    vergiNumara: this.state.vergiNumara,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneCode: this.state.phoneCode,
                    phoneNumber: this.state.phoneNumber,
                    emailAddress: this.state.emailAddress,
                    cityRegion: this.state.cityRegion,
                    industrySector: this.state.industrySector,
                    companyDescription: this.state.companyDescription,
                })
            });

            if (response.ok) {
                console.log("Form submitted", this.state);
                // submit logic
            }
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        // Validate email on change
        if (name === "emailAddress") {
            this.validateEmail(value);
        }
    };

    validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            this.setState({ emailError: "Email is required" });
        } else if (!regex.test(email)) {
            this.setState({ emailError: "Invalid email address" });
        } else {
            this.setState({ emailError: "" });
        }
    };

    render() {
        const color = this.selectedPlan === "premium" ? "purple" : (this.selectedPlan === "standard" ? "green" : "blue");
        const membership = this.selectedPlan === "premium" ? "Premium Annual membership" : (this.selectedPlan === "standard" ? "Standard Annual membership" : "Free Plan");

        return <div className="become-member">

            <div className={`heading ${color}`}>
                <h1>You are about to join {AppConst.brandName} <br />Community. Thank you for selecting <br /> <span className="blue">{membership}</span></h1>
                <p>Get ready to unlock endless opportunities and connect with <br /> businesses from around the world.<b> Welcome aboard !</b></p>
            </div>

            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {/* Company Name */}
                    <div className="form-group">
                        <label><span className="required">*</span> Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Must be a registered company within Türkiye"
                            value={this.state.companyName}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    {/* Vergi Numara */}
                    <div className="form-group">
                        <label><span className="required">*</span> Vergi Numara</label>
                        <input
                            type="text"
                            name="vergiNumara"
                            placeholder="Enter your email address"
                            value={this.state.vergiNumara}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    {/* Full Name - Two fields */}
                    <div className="form-group">
                        <label><span className="required">*</span> Full Name</label>
                        <div className="two-inputs">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Telephone - Code + Number */}
                    <div className="form-group">
                        <label><span className="required">*</span> Telephone</label>
                        <div className="phone-inputs">
                            <input
                                type="text"
                                name="phoneCode"
                                placeholder="Code"
                                value={this.state.phoneCode}
                                onChange={this.handleChange}
                                className="phone-code"
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                        <label><span className="required">*</span> Email Address</label>
                        <input
                            type="email"
                            name="emailAddress"
                            placeholder="Enter your email address"
                            value={this.state.emailAddress}
                            onChange={this.handleChange}
                            required
                        />
                        {this.state.emailError && (
                            <span className="error">{this.state.emailError}</span>
                        )}
                    </div>

                    {/* City / Region */}
                    <div className="form-group">
                        <label><span className="required">*</span> City / Region</label>
                        <input
                            type="text"
                            name="cityRegion"
                            value={this.state.cityRegion}
                            onChange={this.handleChange}
                            className="input-with-flag"
                            style={{ backgroundImage: "url(/assets/flag.png)" }}
                        />
                    </div>

                    {/* Industry Sector */}
                    <div className="form-group">
                        <label><span className="required">*</span> Industry Sector</label>
                        <select
                            name="industrySector"
                            value={this.state.industrySector}
                            onChange={this.handleChange}
                            required
                            className="industry-select"
                        >
                            <option value="">Select the specified industry</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Construction">Construction</option>
                            <option value="Education">Education</option>
                            <option value="Energy">Energy</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="IT & Software">IT & Software</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail">Retail</option>
                            <option value="Telecommunications">Telecommunications</option>
                            <option value="Transportation">Transportation</option>
                        </select>
                    </div>

                    {/* Company Description */}
                    <div className="form-group">
                        <label><span className="required">*</span> Company Description</label>
                        <textarea
                            name="companyDescription"
                            placeholder="Add your company description"
                            value={this.state.companyDescription}
                            onChange={this.handleChange}
                            rows={8}
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Become a member</button>
                </form>
            </div>
        </div>

    }
}
