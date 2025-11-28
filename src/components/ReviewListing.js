import React from "react";
import "./ReviewListing.scss";
import ReviewCard from "./ReviewCard";

export default class ReviewListing extends React.Component {
  render() {
    const { reviews = [] } = this.props;

    if (reviews.length === 0) {
      return <div className="review-listing empty">No reviews yet.</div>;
    }

    return (
      <div className="review-listing">
        <div className="reviews-container">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    );
  }
}