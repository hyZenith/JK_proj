import React, { Component } from "react";

class Breadcrumb extends Component {
  render() {
    const { breadcrumb } = this.props;

    if (!breadcrumb || !breadcrumb.toArray) return null;

    return (
      <div className="breadcrumb-widget">
        <a href="/"><i className="fa-solid fa-house"></i></a>
        {breadcrumb.toArray().map((cat, index) => {
          if (!cat) return null;

          const separator = <i key={`sep-${index}`} className="fa-solid fa-caret-right"></i>;

          let link = null;

          if (cat.level === 1) {
            link = (
              <span key={cat.slug}>
                <a href={`/category/${cat.slug}`}>{cat.slug}</a>
              </span>
            );
          } else if (cat.level === 2) {
            link = (
              <span key={cat.slug}>
                <a href={`/category/${cat.category?.slug}/${cat.slug}`}>{cat.slug}</a>
              </span>
            );
          } else if (cat.level === 3) {
            link = (
              <span key={cat.slug}>
                <a href={`/category/${cat.category?.category?.slug}/${cat.category?.slug}/${cat.slug}`}>
                  {cat.slug}
                </a>
              </span>
            );
          }

          return (
            <React.Fragment key={index}>
              {separator}
              {link}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default Breadcrumb;
