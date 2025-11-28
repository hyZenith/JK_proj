import React, { Component } from "react";
import ProductCard from "../components/ProductCard"; // Adjust path if needed
import "./WishListingPage.scss";

class WishListingPage extends Component {
  render() {
    const { wishes } = this.props;

    return (
      <div className="wrapper">
        <div className="wish-listing">
          {wishes && wishes.length > 0 ? (
            wishes.map((wish, index) => (
              <ProductCard key={wish.product.id || index} product={wish.product} />
            ))
          ) : (
            <span>no records found</span>
          )}
        </div>
      </div>
    );
  }
}

export default WishListingPage;
