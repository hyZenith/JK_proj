import React, { Component } from "react";
import "./StorePage.scss";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import ProductListing from "../components/ProductListing";
import { FaCheckCircle, FaExternalLinkAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ReviewListing from "../components/ReviewListing";
import { ConfirmModal } from "../service/ModalService";
import LoginModal from "../components/LoginModal";
import ReviewRepository from "../repository/ReviewRepository";

class StorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: null,
      reviews: null,
      stats: [],
      storeCategories: [],
      isMember: false,
      selectedTab: "products",
      isBookmarked: false,

      // premium info
      phoneNumber: null,
    };
  }

  async componentDidMount() {
    const manufacturer = await this.fetchStore();
    const stats = await this.fetchStats();
    const storeCategories = await this.fetchStoreCategories();
    const isMember = await this.checkMembership();
    const reviews = await ReviewRepository.ofManufacturer(manufacturer.id);

    this.setState({ manufacturer, stats, storeCategories, isMember, reviews });
  }

  onBookmarkClicked = async () => {
    if (this.props.auth.isLoggedIn()) {
      const status = await ManufacturerRepository.bookmark(this.state.manufacturer.id);
      this.setState({ isBookmarked: status });
    } else {
      this.onAnonymousUser();
    }
  }

  fetchStore = async () => {
    return await ManufacturerRepository.bySlug(this.props.router.params['company-slug']);
  };

  // TODO: Fetch stats asynchronously
  fetchStats = async () => {
    return [
      { text: "Products", count: 10 },
      { text: "Reviews", count: 5 },
    ];
  };

  // TODO: Fetch store categories asynchronously
  fetchStoreCategories = async () => {
    return [
      {
        category: { id: 1, name: "Category 1" },
        isSelected: true,
        products: [], // TODO: Add products
      },
      {
        category: { id: 2, name: "Category 2" },
        isSelected: false,
        products: [], // TODO: Add products
      },
    ];
  };

  // TODO: Check membership asynchronously
  checkMembership = async () => {
    return true; // Example: assume user is a member
  };

  onGetPhoneClicked = async () => {
    if (this.props.auth.isLoggedIn()) {
      const phoneNumber = await ManufacturerRepository.getPhoneNumber(this.state.manufacturer.id);

      this.setState({
        phoneNumber: phoneNumber ?? "Login"
      });
    } else {
      this.onAnonymousUser();
    }
  }

  onGoToWebsiteClicked = async () => {
    if (this.props.auth.isLoggedIn()) {
      const link = await ManufacturerRepository.getWebsiteLink(this.state.manufacturer.id);
      this.props.router.navigate(link, {
        isExternal: true
      });
    } else {
      this.onAnonymousUser();
    }
  }

  onSocialMediaClicked = async (socialMedia) => {
    if (this.props.auth.isLoggedIn()) {
      const link = await ManufacturerRepository.getSocial(this.state.manufacturer.id, socialMedia);
      this.props.router.navigate(link, {
        isExternal: true
      });
    } else {
      this.onAnonymousUser();
    }
  }

  onAnonymousUser() {
    // show the login modal
    this.props.modal.show(LoginModal, { title: "Hello" });
  }


  render() {
    const { manufacturer, stats, storeCategories, isMember } = this.state;

    if (!manufacturer) return <div>Loading...</div>;

    return (

      <div className="store-page">


        <aside className="sidebar">
          <div className="profile-picture">
            <img
              loading="lazy"
              src={manufacturer.avatar || "assets/store-empty-picture.png"}
              alt={manufacturer.name}
            />
          </div>
          <div className="about">
            <h2 className="name">{manufacturer.name} {manufacturer.verified ? <FaCheckCircle /> : <></>}</h2>
            <p className="description">{manufacturer.description}</p>
          </div>

          <div className="buttons">
            <button onClick={this.onBookmarkClicked}>{this.state.isBookmarked ? "Bookmarked": "Bookmark"}</button>
            <button onClick={this.onGetPhoneClicked}>{this.state.phoneNumber ?? "Get phone number"}</button>
            <button onClick={this.onGoToWebsiteClicked}>Go to website <FaExternalLinkAlt /></button>
            <div className="social">
              <button onClick={() => this.onSocialMediaClicked("facebook")}><FaFacebook /></button>
              <button onClick={() => this.onSocialMediaClicked("twitter")}><FaTwitter /></button>
              <button onClick={() => this.onSocialMediaClicked("instagram")}><FaInstagram /></button>
              <button onClick={() => this.onSocialMediaClicked("youtube")}><FaYoutube /></button>
              <button onClick={() => this.onSocialMediaClicked("linkedin")}><FaLinkedin /></button>
            </div>

          </div>

          <div className="stats">
            <ul>
              {stats.map((stat, idx) => (
                <li key={idx}>
                  <span>{stat.text}</span>
                  <span>{stat.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="right-side">
          <div className="store-header">{manufacturer.description}</div>
          <div className="content">
            <div className="view-tab">
              <button
                onClick={() => {
                  this.setState({
                    selectedTab: "products"
                  })
                }}
                className="chip"
                data-selected={this.state.selectedTab === "products"}
              >
                Products ({manufacturer.products.length})
              </button>

              <button
                className="chip"
                onClick={() => {
                  this.setState({
                    selectedTab: "reviews"
                  })
                }}
                data-selected={this.state.selectedTab === "reviews"}
              >
                Reviews ({manufacturer.reviews.length})
              </button>
            </div>

            <div data-selected={this.state.selectedTab === "products"} id="product-view" className="page-view">
              <div className="category-chips">
                {storeCategories.map((c) => (
                  <button
                    key={c.category.id}
                    hide-targets=".product-listing"
                    target-id={`#product-listing-${c.category.id}`}
                    className="chip toggle-listing-js"
                    data-selected={c.isSelected ? "1" : "0"}
                  >
                    {c.category.name} ({c.products.length})
                  </button>
                ))}
              </div>

              <ProductListing products={manufacturer.products} />
            </div>

            <div data-selected={this.state.selectedTab === "reviews"} id="review-view" className="page-view">
              <div className="review-listing">
                {this.state.reviews.length > 0 ? (
                  <ReviewListing reviews={this.state.reviews} />

                ) : (
                  <p className="no-review">There is no review</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StorePage;
