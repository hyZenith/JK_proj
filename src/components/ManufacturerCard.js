import React, { Component } from "react";
import "./ManufacturerCard.scss";
import { FaCheckCircle } from "react-icons/fa";

class ManufacturerCard extends Component {
  render() {
    const { manufacturer } = this.props;

    if (!manufacturer) return null;

    // Construct manufacturer URL
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
        <p>{manufacturer.industry || "Industry sector / sector title"}</p>
        <p>{manufacturer.shortDescription}</p>
        {this.props.footer}
      </a>
    );
  }
}

export default ManufacturerCard;
