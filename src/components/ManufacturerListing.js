import React, { Component } from "react";
import ManufacturerCard from "./ManufacturerCard"; // Adjust the path as needed
import "./ManufacturerListing.scss";

export default class ManufacturerListing extends Component {
  render() {
    const { manufacturers } = this.props;

    if (!manufacturers || manufacturers.length === 0) return null;

    return (
      <div className="manufacturer-listing">
        {manufacturers.map((m) => (
          <ManufacturerCard key={m.id} manufacturer={m} />
        ))}
      </div>
    );
  }
}
