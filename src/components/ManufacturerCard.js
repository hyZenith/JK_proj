import React, { Component } from "react";
import "./ManufacturerCard.scss";
import { FaCheckCircle, FaStar } from "react-icons/fa";

class ManufacturerCard extends Component {
  render() {
    const { manufacturer } = this.props;

    if (!manufacturer) return null;

    const manufacturerUrl = `/m/${manufacturer.slug}`;

    return (
      <a className="company" href={manufacturerUrl}>
        <img
          loading="lazy"
          className="avatar"
          src={manufacturer.avatar || "/assets/manufacturer-empty-picture.png"}
          alt={manufacturer.name}
        />
        <div className="title">
          <h5>{manufacturer.name}</h5>
          {manufacturer.verified ? <FaCheckCircle /> : <></>}
        </div>
        {manufacturer.rating && (
          <div className="stars">
            {[...Array(manufacturer.rating)].map((_, index) => (
              <FaStar key={index} className="star" />
            ))}
          </div>
        )}
        <p>{manufacturer.industry || "Industry sector / sector title"}</p>
        {manufacturer.description && <p>{manufacturer.description}</p>}
        {manufacturer.shortDescription && <p>{manufacturer.shortDescription}</p>}
        {this.props.footer}
      </a>
    );
  }
}

export default ManufacturerCard;
