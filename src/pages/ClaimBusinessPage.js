import React from "react";
import "./ClaimBusinessPage.scss";
import AppConst from "../AppConst";

export default class ClaimBusinessPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companyNameToClaim: "Tic ve SAN LTD",
            // form
            companyName: '',
            registrationNo: '',
            fullName: '',
            phoneNumber: '',
            emailAddress: '',
            city: '',
            industries: [],
            description: '',
            vatNumber: '',

            newIndustry: '',
            filteredSuggestions: [],
            showSuggestions: false,
            allIndustries: [
                "Automotive",
                "Agriculture",
                "Construction",
                "Education",
                "Energy",
                "Finance",
                "Healthcare",
                "IT & Software",
                "Manufacturing",
                "Marketing",
                "Retail",
                "Telecommunications",
                "Transportation",
            ]
        };
    }

    fetchIndustries = async () => {
        // TODO: fetch industries

    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submit
        this.validateEmail(this.state.emailAddress);

        if (!this.state.emailError) {
            const response = await fetch(AppConst.api(AppConst.claimBusiness), {
                method: "POST",
                body: JSON.stringify({
                    companyName: this.state.companyName,
                    registrationNo: this.state.registrationNo,
                    fullName: this.state.fullName,
                    phoneNumber: this.state.phoneNumber,
                    emailAddress: this.state.emailAddress,
                    city: this.state.city,
                    industries: this.state.industries,
                    description: this.state.description,
                    vatNumber: this.state.vatNumber,
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
        // Simple regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            this.setState({ emailError: "Email is required" });
        } else if (!regex.test(email)) {
            this.setState({ emailError: "Invalid email address" });
        } else {
            this.setState({ emailError: "" });
        }
    };

    handleIndustryChange = (e) => {
        const value = e.target.value;
        const filtered = this.state.allIndustries.filter(ind =>
            ind.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            newIndustry: value,
            filteredSuggestions: filtered,
            showSuggestions: true
        });
    };

    addIndustry = (industry) => {
        const value = industry || this.state.newIndustry;
        if (value.trim() !== "" && !this.state.industries.includes(value)) {
            this.setState(prevState => ({
                industries: [...prevState.industries, value],
                newIndustry: '',
                showSuggestions: false
            }));
        }
    };

    removeIndustry = (index) => {
        this.setState(prevState => ({
            industries: prevState.industries.filter((_, i) => i !== index)
        }));
    };

    render() {
        
        return <div className="claim-business">
            <div className="heading">
                <h1>If your business is already listed in our directory, <br /> verifiy ownership and <span className="blue">Claim Your Listing</span></h1>
                <p>Fill out the claim form below to verify your ownership <br/> <span className="blue">{this.state.companyNameToClaim}</span></p>
            </div>

            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Your company legal name"
                            value={this.state.companyName}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registrationNo">Company registration no:</label>
                        <input
                            type="text"
                            id="registrationNo"
                            name="registrationNo"
                            value={this.state.registrationNo}
                            placeholder="Mersis NO"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationNo">Company VAT No:</label>
                        <input
                            type="text"
                            id="vatNumber"
                            name="vatNumber"
                            placeholder="VAT Number"
                            value={this.state.vatNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full name (owner):</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Your full name"
                            value={this.state.fullName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Your company phone number"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address:</label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="Your company email address"
                            value={this.state.emailAddress}
                            onChange={this.handleChange}
                        />
                        {this.state.emailError && (
                            <span className="error">{this.state.emailError}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="The city of where your company is located"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Industries:</label>
                        <div className="industries-container">
                            <div className="chips-container">
                                {this.state.industries.map((industry, index) => (
                                    <div key={index} className="chip">
                                        {industry}
                                        <button
                                            type="button"
                                            onClick={() => this.removeIndustry(index)}
                                            className="remove-chip"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <input
                                type="text"
                                placeholder="Search or add industry"
                                value={this.state.newIndustry}
                                onChange={this.handleIndustryChange}
                                onBlur={() => this.setState({ showSuggestions: false })}
                                onFocus={() => this.setState({ showSuggestions: true })}
                            />

                            {this.state.showSuggestions && this.state.filteredSuggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {this.state.filteredSuggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => this.addIndustry(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Company description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">Claim</button>
                </form>
            </div>
        </div>

    }
}