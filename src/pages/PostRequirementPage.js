import React, { useState } from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./PostRequirementPage.scss";

const PostRequirementPage = () => {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        quantity: "",
        description: "",
        targetPrice: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
                <h1 className="post-requirement__title">Post Your Requirement</h1>
                <p className="post-requirement__subtitle">
                    Tell us what you need and let verified Turkish suppliers reach out to you
                </p>

                <form className="post-requirement__form" onSubmit={handleSubmit}>
                    <div className="post-requirement__form-group">
                        <label htmlFor="productName">Product Name *</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            placeholder="What product are you looking for?"
                        />
                    </div>

                    <div className="post-requirement__form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="textiles">Textiles & Apparel</option>
                            <option value="food">Food & Beverages</option>
                            <option value="electronics">Electronics</option>
                            <option value="machinery">Machinery</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="post-requirement__form-group">
                        <label htmlFor="quantity">Quantity *</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 1000 units"
                        />
                    </div>

                    <div className="post-requirement__form-group">
                        <label htmlFor="targetPrice">Target Price</label>
                        <input
                            type="text"
                            id="targetPrice"
                            name="targetPrice"
                            value={formData.targetPrice}
                            onChange={handleChange}
                            placeholder="Your budget (optional)"
                        />
                    </div>

                    <div className="post-requirement__form-group post-requirement__form-group--full">
                        <label htmlFor="description">Detailed Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Provide detailed specifications, quality requirements, delivery timeline, etc."
                        />
                    </div>

                    <div className="post-requirement__form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="post-requirement__form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+90 XXX XXX XX XX"
                        />
                    </div>

                    <button type="submit" className="post-requirement__submit">
                        Submit Requirement
                    </button>
                </form>
            </div>
        </InfoPagesLayout>
    );
};

export default PostRequirementPage;
