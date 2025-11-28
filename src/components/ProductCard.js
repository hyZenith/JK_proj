import React, { Component } from "react";
import "./ProductCard.scss";

class ProductCard extends Component {
  // TODO: Handle adding product to wishlist
  handleAddToWishlist = () => {
    const { product } = this.props;
    console.log("Add to wishlist clicked for:", product.id);
  };

  render() {
    const { product } = this.props;

    if (!product) return null;

    // Construct product URL (you may replace with React Router Link)
    const productUrl = `/p/${product.category?.category?.slug}/${product.category?.slug}/${product.slug}`;

    return (
      <div className="card product">
        <a href={productUrl}>

          <div className="body">
            <div className="image">
              <img
                loading="lazy"
                src={product.featuredImage?.url}
                alt={product.name}
              />
            </div>
          </div>

          <div className="footer">
            <h1 className="title">{product.name}</h1>
          </div>
        </a>
      </div>
    );
  }
}

export default ProductCard;
