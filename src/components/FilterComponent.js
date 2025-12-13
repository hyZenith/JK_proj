import React, { Component } from "react";
import "./FilterComponent.scss";

export default class FilterComponent extends Component {
  state = {
    expandedCategories: new Set(),
  };

  componentDidMount() {
    this.expandSelectedCategory();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedCategory?.id !== this.props.selectedCategory?.id ||
      prevProps.selectedSubcategory?.id !== this.props.selectedSubcategory?.id
    ) {
      this.expandSelectedCategory();
    }
  }

  expandSelectedCategory = () => {
    const { selectedCategory } = this.props;
    if (selectedCategory && selectedCategory.categories && selectedCategory.categories.length > 0) {
      this.setState((prevState) => {
        const expandedCategories = new Set(prevState.expandedCategories);
        expandedCategories.add(selectedCategory.id);
        return { expandedCategories };
      });
    }
  };

  toggleCategory = (categoryId) => {
    this.setState((prevState) => {
      const expandedCategories = new Set(prevState.expandedCategories);
      if (expandedCategories.has(categoryId)) {
        expandedCategories.delete(categoryId);
      } else {
        expandedCategories.add(categoryId);
      }
      return { expandedCategories };
    });
  };

  render() {
    const { categories = [], selectedCategory, selectedSubcategory } = this.props;
    const { expandedCategories } = this.state;

    return (
      <form>
        <div className="body">
          <h3 className="filter__title">Category</h3>
          {categories.length > 0 ? (
            <div className="form-group">
              {categories.map((category) => {
                const hasSubcategories = category.categories && category.categories.length > 0;
                const isExpanded = expandedCategories.has(category.id);

                return (
                  <div key={category.id} className={`category-group ${isExpanded ? "expanded" : ""}`}>
                    <div 
                      className="category-header"
                      onClick={(e) => {
                        if (hasSubcategories && e.target.type !== "checkbox" && e.target.tagName !== "INPUT" && e.target.tagName !== "LABEL" && e.target.tagName !== "SPAN") {
                          e.preventDefault();
                          this.toggleCategory(category.id);
                        }
                      }}
                    >
                      <label
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (this.props.router?.navigate) {
                            this.props.router.navigate(`/c/${category.slug}`);
                          } else if (window.location) {
                            window.location.href = `/c/${category.slug}`;
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          value={category.id}
                          checked={selectedCategory?.id === category.id}
                          readOnly
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (this.props.router?.navigate) {
                              this.props.router.navigate(`/c/${category.slug}`);
                            } else if (window.location) {
                              window.location.href = `/c/${category.slug}`;
                            }
                          }}
                        />
                        <span>{category.name}</span>
                      </label>
                      {hasSubcategories && (
                        <span
                          className={`chevron ${isExpanded ? "expanded" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.toggleCategory(category.id);
                          }}
                        >
                          <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 185.34 185.34"
                            xmlSpace="preserve"
                            transform="rotate(90)"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              stroke="#0057ffCCCCCC"
                              strokeWidth="11.861951999999999"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <g>
                                <g>
                                  <path
                                    style={{ fill: "#0057ff" }}
                                    d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>
                    {hasSubcategories && isExpanded && (
                      <div className="subcategories">
                        {category.categories.map((subcategory) => (
                          <label
                            key={subcategory.id}
                            className="subcategory"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              if (this.props.router?.navigate) {
                                this.props.router.navigate(
                                  `/c/${category.slug}/${subcategory.slug}`
                                );
                              } else if (window.location) {
                                window.location.href = `/c/${category.slug}/${subcategory.slug}`;
                              }
                            }}
                          >
                            <input
                              type="checkbox"
                              value={subcategory.id}
                              checked={selectedSubcategory?.id === subcategory.id}
                              readOnly
                            />
                            <span>{subcategory.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </form>
    );
  }
}

