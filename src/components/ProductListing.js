import React, { Component } from "react";
import ProductCard from "./ProductCard"; // Adjust the path as needed
import "./ProductListing.scss";

class ProductListing extends Component {
  render() {
    const { products } = this.props;

    if (!products || products.length === 0) return null;

    return (
      <div className="product-listing">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductListing;
