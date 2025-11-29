import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./ExhibitionsPage.scss";

const ExhibitionsPage = () => {
  const exhibitions = [
    {
      name: "Istanbul Textile & Fashion Fair",
      date: "March 15-18, 2024",
      location: "Istanbul Expo Center",
      category: "Textiles & Fashion",
      description:
        "The largest textile and fashion exhibition in Turkey, featuring over 500 exhibitors.",
    },
    {
      name: "Ankara Food & Beverage Expo",
      date: "April 22-25, 2024",
      location: "Ankara Convention Center",
      category: "Food & Beverage",
      description:
        "Discover the finest Turkish food products and connect with leading manufacturers.",
    },
    {
      name: "Izmir Industrial Machinery Fair",
      date: "May 10-13, 2024",
      location: "Izmir International Fair Center",
      category: "Machinery & Equipment",
      description:
        "Showcasing cutting-edge industrial machinery and manufacturing solutions.",
    },
    {
      name: "Antalya Home & Furniture Exhibition",
      date: "June 5-8, 2024",
      location: "Antalya Expo Center",
      category: "Home & Furniture",
      description:
        "Explore the latest trends in home decor, furniture, and interior design.",
    },
  ];

  return (
    <InfoPagesLayout activePage="exhibitions">
      <div className="exhibitions__container">
        <h1 className="exhibitions__title">Exhibitions in Türkiye</h1>
        <p className="exhibitions__subtitle">
          Stay updated on Türkiyeʼs major trade exhibitions and events. Discover
          opportunities to network, showcase your business, or explore new
          sectors. Join us in exploring key events driving Türkiyeʼs trade
          landscape forward.
        </p>

        <div className="exhibitions__grid">
          {exhibitions.map((exhibition, index) => (
            <div key={index} className="exhibitions__card">
              <div className="exhibitions__card-header">
                <p className="exhibitions__date">{exhibition.date}</p>
              </div>
              <h3 className="exhibitions__name">{exhibition.name}</h3>
              <span className="exhibitions__category">
                {exhibition.category}
              </span>
              <div className="exhibitions__details">
                <p className="exhibitions__location">
                {exhibition.location}
                </p>
                <p className="exhibitions__description">
                  {exhibition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfoPagesLayout>
  );
};

export default ExhibitionsPage;
