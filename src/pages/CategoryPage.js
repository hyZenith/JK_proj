import React, { Component } from "react";

import FilterComponent from "../components/FilterComponent";
import ProductRepository from "../repository/ProductRepository";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import CategoryRepository from "../repository/CategoryRepository";
import ManufacturerCard from "../components/ManufacturerCard";
import OnceVisibleTrigger from "../components/OnceVisibleTrigger";

import "../components/ManufacturerListing.scss";
import "./CategoryPage.scss";

export default class CategoryPage extends Component {
  state = {
    promotedTopManufacturers: [],
    products: [],
    manufacturers: [],
    categories: [],
    searchType: this.getNavMode(),
    productPage: 1,
    manufacturerPage: 1,
    selectedCategory: null,
    selectedSubcategory: null,
  };

  getNavMode() {
    const navMode = localStorage.getItem("nav-mode") ?? "products";
    return navMode;
  }

  componentDidMount() {
    this.fetchCategories();
    // Fetch data after categories are loaded so we can find the selected category
  }

  componentDidUpdate(prevProps) {
    // Check if URL params changed
    const currentCategorySlug = this.props.router?.params?.['category-slug'];
    const currentSubcategorySlug = this.props.router?.params?.['category-slug-2'];
    const prevCategorySlug = prevProps.router?.params?.['category-slug'];
    const prevSubcategorySlug = prevProps.router?.params?.['category-slug-2'];

    if (
      currentCategorySlug !== prevCategorySlug ||
      currentSubcategorySlug !== prevSubcategorySlug ||
      (this.state.categories.length > 0 && !this.state.selectedCategory)
    ) {
      this.findAndSetSelectedCategory();
    }
  }

  findAndSetSelectedCategory = () => {
    const categorySlug = this.props.router?.params?.['category-slug'];
    const subcategorySlug = this.props.router?.params?.['category-slug-2'];
    const { categories } = this.state;

    if (categories.length === 0) {
      return;
    }

    if (!categorySlug) {
      this.setState(
        {
          selectedCategory: null,
          selectedSubcategory: null,
        },
        () => {
          if (this.state.searchType === "products") {
            this.fetchProducts();
            this.fetchManufacturers();
          } else {
            this.fetchManufacturers();
            this.fetchProducts();
          }
          this.fetchPromotedManufacturers();
        }
      );
      return;
    }

    // Find the category
    const category = categories.find((cat) => cat.slug === categorySlug);
    
    if (category) {
      let subcategory = null;
      
      if (subcategorySlug && category.categories) {
        subcategory = category.categories.find(
          (sub) => sub.slug === subcategorySlug
        );
      }

      this.setState(
        {
          selectedCategory: category,
          selectedSubcategory: subcategory,
        },
        () => {
          this.fetchManufacturersByCategory();
          if (this.state.searchType === "products") {
            this.fetchProducts();
          }
          this.fetchPromotedManufacturers();
        }
      );
    } else {
      this.setState(
        {
          selectedCategory: null,
          selectedSubcategory: null,
        },
        () => {
          if (this.state.searchType === "products") {
            this.fetchProducts();
            this.fetchManufacturers();
          } else {
            this.fetchManufacturers();
            this.fetchProducts();
          }
          this.fetchPromotedManufacturers();
        }
      );
    }
  };

  fetchPromotedManufacturers = async (page = 1) => {
    const promotedTopManufacturers = await ManufacturerRepository.promoted({
      q: this.props.router.query["q"],
    });
    this.setState({
      promotedTopManufacturers: promotedTopManufacturers,
    });
  };

  fetchProducts = async (page = 1) => {
    const products = await ProductRepository.search({
      q: this.props.router.query["q"],
      page: page,
    });
    this.setState((prevState) => ({
      products: [...prevState.products, ...products],
      productPage: page,
    }));
  };

  fetchManufacturers = async (page = 1) => {
    const manufacturers = await ManufacturerRepository.search({
      q: this.props.router.query["q"],
      page: page,
    });
    this.setState((prevState) => {
      const existingIds = new Set(prevState.manufacturers.map(m => m.id));
      const newManufacturers = (manufacturers || []).filter(m => !existingIds.has(m.id));
      return {
        manufacturers: [...prevState.manufacturers, ...newManufacturers],
        manufacturerPage: page,
      };
    });
  };

  fetchManufacturersByCategory = async (page = 1) => {
    const { selectedCategory, selectedSubcategory } = this.state;
    // Use subcategory slug if , otherwise use category slug
    const categorySlug = selectedSubcategory
      ? selectedSubcategory.slug
      : selectedCategory?.slug;

    if (!categorySlug) {
      this.fetchManufacturers(page);
      return;
    }

    const manufacturers = await ManufacturerRepository.searchByCategory(categorySlug);
    
    if (page === 1) {
      this.setState({
        manufacturers: manufacturers || [],
        manufacturerPage: 1,
      });
    } else {
      this.setState((prevState) => {
        // Deduplicate manufacturers by ID before adding to state
        const existingIds = new Set(prevState.manufacturers.map(m => m.id));
        const newManufacturers = (manufacturers || []).filter(m => !existingIds.has(m.id));
        return {
          manufacturers: [...prevState.manufacturers, ...newManufacturers],
          manufacturerPage: page,
        };
      });
    }
  };

  fetchCategories = async () => {
    const categories = await CategoryRepository.homepage();
    this.setState(
      {
        categories: categories || [],
      },
      () => {
        this.findAndSetSelectedCategory();
      }
    );
  };

  handlePrevSlide = () => {
    console.log("Prev slide clicked");
  };

  handleNextSlide = () => {
    console.log("Next slide clicked");
  };

  handleToggleView = (searchType) => {
    this.setState({
      searchType: searchType,
    });
  };

  render() {
    const {
      promotedTopManufacturers,
      products,
      manufacturers,
      categories,
      selectedCategory,
      selectedSubcategory,
    } = this.state;

    const uniqueManufacturers = manufacturers.filter((manufacturer, index, self) =>
      index === self.findIndex((m) => m.id === manufacturer.id)
    );

    const displayName = selectedSubcategory
      ? selectedSubcategory.name
      : selectedCategory
      ? selectedCategory.name
      : "All Categories";

    const resultsCount = uniqueManufacturers.length;

    return (
      <div className="search-page">
        <div className="search-page__results">
          <p>
            [{resultsCount}] Results for : {displayName}
          </p>
        </div>
        <div className="content">
          <div className="filter">
            <FilterComponent
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              router={this.props.router}
            />
          </div>

          <div className="listing">
            <div className="view">
              <div
                data-active={this.state.searchType === "products"}
                className="listing-view"
              >
                <div className="manufacturer-listing">
                  {uniqueManufacturers.map((manufacturer) => (
                    <ManufacturerCard key={`products-${manufacturer.id}`} manufacturer={manufacturer} />
                  ))}
                </div>
                <OnceVisibleTrigger
                  onTrigger={() => {
                    if (this.state.selectedCategory) {
                      this.fetchManufacturersByCategory(
                        this.state.manufacturerPage + 1
                      );
                    } else {
                      this.fetchManufacturers(this.state.manufacturerPage + 1);
                    }
                  }}
                ></OnceVisibleTrigger>
              </div>

              <div
                data-active={this.state.searchType === "suppliers"}
                className="listing-view"
              >
                <div className="manufacturer-listing">
                  {uniqueManufacturers.map((manufacturer) => (
                    <ManufacturerCard key={`suppliers-${manufacturer.id}`} manufacturer={manufacturer} />
                  ))}
                </div>
                <OnceVisibleTrigger
                  onTrigger={() => {
                    if (this.state.selectedCategory) {
                      this.fetchManufacturersByCategory(
                        this.state.manufacturerPage + 1
                      );
                    } else {
                      this.fetchManufacturers(this.state.manufacturerPage + 1);
                    }
                  }}
                ></OnceVisibleTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
