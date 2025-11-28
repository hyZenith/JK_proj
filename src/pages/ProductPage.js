import React, { Component } from "react";
import ProductRepository from "../repository/ProductRepository";
import ManufacturerCard from "../components/ManufacturerCard";
import ProductCard from "../components/ProductCard";
import { FaShareNodes } from "react-icons/fa6";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "./ProductPage.scss";

// TODO: Import your widgets/components
// import ProductCard from "./widgets/ProductCard";

class ProductPage extends Component {
  state = {
    manufacturer: null,
    product: null,
    relatedProducts: [],
    isBookmarked: false
  };

  async componentDidMount() {
    const product = await this.fetchProduct();
    const relatedProducts = await this.fetchRelatedProducts(product.id);

    this.setState({ product, relatedProducts });
  }

  // TODO: Fetch product data asynchronously
  fetchProduct = async () => {
    return await ProductRepository.getBySlug(this.props.router.params['product-slug-3'])
  };

  // TODO: Fetch related products asynchronously
  fetchRelatedProducts = async (productId) => {
    return await ProductRepository.getRelatedProductsOf(productId);
  };

  handleIncrement = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }));
  };

  handleSendEnquiry = () => {
    console.log("Send enquiry clicked");
  };

  handleAddToWishlist = () => {
    console.log("Add to wishlist clicked");
  };

  handleMessageStore = () => {
    console.log("Message store clicked");
  };

  onBookmarkClicked = async () => {
    if (this.props.auth.isLoggedIn()) {
      const status = await ProductRepository.bookmark(this.state.product.id);
      this.setState({ isBookmarked: status });
    } else {
      this.onAnonymousUser();
    }
  }

  render() {
    const { product, relatedProducts } = this.state;

    if (!product) return <div>Loading...</div>;

    return (
      <div className="product-page">

        <div className="product">
          <div className="images">
            <div className="main">
              <img
                loading="lazy"
                className="main-product-image-js"
                src={product.featuredImage.url}
                alt={product.name}
              />
            </div>

            <div className="image_list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  loading="lazy"
                  className="product-image-js"
                  src={img.url}
                  alt={product.name}
                  selected={img.isFeatured ? "true" : "false"}
                />
              ))}
            </div>
          </div>

          <div className="about">
            <div className="header">
              <h1 className="blue">{product.name}</h1>
              <a className="share" href="/">
                <FaShareNodes />
              </a>
            </div>
            <hr />

            <div className="description">
              <button onClick={this.onBookmarkClicked} className="call-to-action" >
                {this.state.isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
              <h3>Product description</h3>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="store-widget">
            <ManufacturerCard manufacturer={product.manufacturer} footer={
              <div className="buttons">
                <a href={`/m/${product.manufacturer.slug}`} className="call-to-action" >
                  Manufacturer Profile
                </a>
              </div>
            } />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="products">
            <div className="section-title">
              <h5>Related products</h5>
            </div>

            <div className="product-listing">
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
                {relatedProducts.map((p, index) => (
                  <SwiperSlide key={p.id}>
                    <ProductCard product={p} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductPage;
