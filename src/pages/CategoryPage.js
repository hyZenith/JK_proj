import React, { Component } from "react";

import ProductListing from "../components/ProductListing";
import FilterComponent from "../components/FilterComponent";
import ProductRepository from "../repository/ProductRepository";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import ManufacturerListing from "../components/ManufacturerListing";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ManufacturerCard from "../components/ManufacturerCard";
import OnceVisibleTrigger from "../components/OnceVisibleTrigger";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./CategoryPage.scss";


// TODO: Import your card and listing components
// import ManufacturerCard from "./widgets/ManufacturerCard";
// import FilterWidget from "./widgets/FilterWidget";
// import ProductsListing from "./widgets/ProductsListing";
// import ManufacturersListing from "./widgets/ManufacturersListing";
// import Pagination from "./widgets/Pagination";

export default class CategoryPage extends Component {
  state = {
    promotedTopManufacturers: [],
    products: [],
    manufacturers: [],
    searchType: this.getNavMode(),
    productPage: 1,
    manufacturerPage: 1,
  };


  getNavMode() {
    const navMode = localStorage.getItem('nav-mode') ?? "products";
    return navMode;
  }

  componentDidMount() {
    if (this.state.searchType === "products") {
      this.fetchProducts();
      this.fetchManufacturers();
    } else {
      this.fetchManufacturers();
      this.fetchProducts();
    }
    this.fetchPromotedManufacturers();
  }

  fetchPromotedManufacturers = async (page = 1) => {
    const promotedTopManufacturers = await ManufacturerRepository.promoted({
      "q": this.props.router.query['q'],
    });
    this.setState({
      promotedTopManufacturers: promotedTopManufacturers,
    })
  };

  fetchProducts = async (page = 1) => {
    const products = await ProductRepository.search({
      "q": this.props.router.query['q'],
      "page": page
    });
    this.setState((prevState) => ({
      products: [...prevState.products, ...products],
      productPage: page,
    }));
  };

  fetchManufacturers = async (page = 1) => {
    const manufacturers = await ManufacturerRepository.search({
      "q": this.props.router.query['q'],
      "page": page
    });
    this.setState((prevState) => ({
      manufacturers: [...prevState.manufacturers, ...manufacturers],
      manufacturerPage: page,
    }));
  };

  // TODO: Handle navigation button clicks for swiper
  handlePrevSlide = () => {
    console.log("Prev slide clicked");
  };

  handleNextSlide = () => {
    console.log("Next slide clicked");
  };

  // TODO: Handle listing view toggle
  handleToggleView = (searchType) => {
    this.setState({
      searchType: searchType
    })
  };

  render() {
    const { promotedTopManufacturers, products, manufacturers } = this.state;

    return (
      <div className="search-page">
        <div className="content">
          <div className="filter">
            <FilterComponent></FilterComponent>
          </div>

          <div className="listing">
            {promotedTopManufacturers.length > 0 && (
              <div className="promoted">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={10}
                  slidesPerView="auto"       // automatically fit slides
                  centeredSlides={false}     // optional
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {promotedTopManufacturers.map(manufacturer => (
                    <SwiperSlide key={manufacturer.id}>
                      <ManufacturerCard manufacturer={manufacturer} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="head">
              <button
                data-active={this.state.searchType === "products"}
                onClick={() => this.handleToggleView("products")}
              >
                Products ({products.length})
              </button>
              <button
                data-active={this.state.searchType === "suppliers"}
                onClick={() => this.handleToggleView("suppliers")}
              >
                Manufacturers ({manufacturers.length})
              </button>
            </div>

            <div className="view">
              <div data-active={this.state.searchType === "products"} className="listing-view">
                <ProductListing products={products} />
                <OnceVisibleTrigger onTrigger={() => this.fetchProducts(this.state.productPage + 1)}></OnceVisibleTrigger>
              </div>

              <div data-active={this.state.searchType === "suppliers"} className="listing-view">
                <ManufacturerListing manufacturers={manufacturers} />
                <OnceVisibleTrigger onTrigger={() => this.fetchManufacturers(this.state.manufacturerPage + 1)}></OnceVisibleTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
