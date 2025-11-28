import React from "react";

export default class ReviewCard extends React.Component {
  renderStars(stars) {
    return (
      <div className="review-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < stars ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  }

  render() {
    const { name, stars, content, avatar } = this.props.review;

    return (
      <div className="review-card">
        <div className="avatar-section">
          <img src={avatar} alt={name} className="avatar" />
        </div>

        <div className="content-section">
          <div className="header">
            <h4 className="review-name">{name}</h4>
            {this.renderStars(stars)}
          </div>
          <p className="review-text">{content}</p>
        </div>
      </div>
    );
  }
}