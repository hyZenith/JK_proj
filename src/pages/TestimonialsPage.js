import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./TestimonialsPage.scss";

const TestimonialsPage = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            company: "Global Imports Ltd.",
            country: "United Kingdom",
            text: "Go Trade Türkiye has been instrumental in helping us find reliable Turkish suppliers. The quality of products and the professionalism of the suppliers we've connected with has exceeded our expectations.",
            rating: 5
        },
        {
            name: "Michael Chen",
            company: "Pacific Trading Co.",
            country: "Singapore",
            text: "As a buyer, I appreciate the ease of posting requirements and receiving multiple quotes. The platform saved us countless hours of research and helped us secure better deals.",
            rating: 5
        },
        {
            name: "Ahmet Yılmaz",
            company: "Textile Exports Inc.",
            country: "Türkiye",
            text: "Being a supplier on this platform has opened doors to international markets we never thought possible. The inquiries are genuine and the support team is always helpful.",
            rating: 5
        },
        {
            name: "Emma Rodriguez",
            company: "Fashion Boutique Chain",
            country: "Spain",
            text: "The verification process gives me confidence that I'm dealing with legitimate businesses. We've established long-term partnerships thanks to Go Trade Türkiye.",
            rating: 5
        }
    ];

    return (
        <InfoPagesLayout activePage="testimonials">
            <div className="testimonials__container">
                <h1 className="testimonials__title">What Our Clients Say</h1>
                <p className="testimonials__subtitle">
                    Real experiences from buyers and suppliers using our platform
                </p>

                <div className="testimonials__grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonials__card">
                            <div className="testimonials__rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>
                            <p className="testimonials__text">"{testimonial.text}"</p>
                            <div className="testimonials__author">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.company}</p>
                                <p className="testimonials__country">{testimonial.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </InfoPagesLayout>
    );
};

export default TestimonialsPage;
