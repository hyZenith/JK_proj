import React, { Component } from "react";
import "./HomePage.scss";
import AppConst from "../AppConst";
import CategoryRepository from "../repository/CategoryRepository";
import { FaBolt, FaBullseye, FaChevronRight, FaHandshake } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import ManufacturerCard from "../components/ManufacturerCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      manufacturers: [],
      isLoadingCategories: true,
      categoriesError: null,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchStores();
  }

  fetchCategories = async () => {
    try {
      this.setState({ isLoadingCategories: true, categoriesError: null });

      const categories = await CategoryRepository.homepage();

      // DEBUG: Log what we got from backend
      console.log('🔍 CATEGORIES DEBUG:');
      console.log('Total categories:', categories?.length || 0);
      console.log('Categories data:', categories);

      if (categories && categories.length > 0) {
        console.log('✅ First category:', categories[0]);
        console.log('✅ First category name:', categories[0].name);
        console.log('✅ First category subcategories:', categories[0].categories);
      } else {
        console.warn('⚠️ No categories returned from backend');
      }

      this.setState({
        categories: categories || [],
        isLoadingCategories: false
      });

    } catch (error) {
      console.error('❌ ERROR fetching categories:', error);
      this.setState({
        categoriesError: error.message,
        isLoadingCategories: false
      });
    }
  };

  fetchStores = async () => {
    try {
      const manufacturers = await ManufacturerRepository.homepage();
      this.setState({
        manufacturers: manufacturers || []
      });
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  render() {
    const { categories, manufacturers, isLoadingCategories, categoriesError } = this.state;

    return (
      <div>
        <div className="welcome wrapper">
          <div>
            <h1 className="text-headline">
              Explore a world<br />
              of business<br />
              in <span className="red">Türkiye</span>
            </h1>
            <p className="description text-body">
              Our online directory helps you discover top Turkish suppliers,<br />
              connect with the right partners, and secure the best deals for<br />
              your business.
            </p>
            <div className="trust-lines text-body">
              <p>We are trusted by <strong>+100k businesses</strong> worldwide.</p>
              <p>Grow Your Business <strong>Beyond Borders.</strong></p>
              <p>Explore over <strong>+30k thriving industries across Türkiye.</strong></p>
            </div>
          </div>
          <div>
            <img loading="lazy" src="assets/homepage-image-1.png" alt="Welcome" />
          </div>
        </div>

        <div className="categories">
          <div className="categories__container">
            <h2 className="categories__headline">
              Direct access to verified Turkish
              <br />
              suppliers across 100+ industries.
            </h2>
            <p className="categories__description">
              Find the most relevant partners for your project tailored to your
              <br />
              unique needs with Go Trade Türkiye.
            </p>

            <div className="categories__grid">
              {isLoadingCategories ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                  <p style={{ fontSize: '18px', color: '#686159' }}>Loading categories...</p>
                </div>
              ) : categoriesError ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                  <p style={{ fontSize: '18px', color: '#cc0000' }}>
                    Error loading categories. Please refresh the page.
                  </p>
                </div>
              ) : categories && categories.length > 0 ? (
                categories.map((category, index) => {
                  if (!category || !category.name) {
                    console.warn('Invalid category at index:', index);
                    return null;
                  }

                  const iconNumber = (index % 9) + 1;
                  const iconSrc = `/assets/Industries%20Icons/icon.top${iconNumber}.png`;

                  return (
                    <div key={category.slug || `category-${index}`} className="category-card">
                      <div className="category-card__header">
                        <div className="category-card__icon-wrapper">
                          <img
                            src={iconSrc}
                            alt={`${category.name} icon`}
                            className="category-card__icon"
                            loading="lazy"
                            onError={(e) => {
                              console.warn('Icon load failed:', iconSrc);
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <h3 className="category-card__title">{category.name}</h3>
                      </div>

                      <div className="category-card__body">
                        <ul className="category-card__list">
                          {category.categories && Array.isArray(category.categories) &&
                            category.categories.slice(0, 5).map((subcategory, subIndex) => {
                              if (!subcategory || !subcategory.name) {
                                return null;
                              }

                              return (
                                <li key={subcategory.slug || `sub-${subIndex}`} className="category-card__item">
                                  <a href={`/c/${category.slug}/${subcategory.slug}`}>
                                    <span className="category-card__item-text">
                                      {subcategory.name}
                                    </span>
                                    <svg
                                      className="category-card__arrow"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M7 4L13 10L7 16"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                  <p style={{ fontSize: '18px', color: '#686159' }}>
                    No categories available at the moment.
                  </p>
                </div>
              )}
            </div>

            <div className="categories__cta-wrapper">
              <button
                className="categories__browse-button"
                onClick={() => {
                  this.props.router.navigate("/search?type=products");
                  this.props.refreshService.trigger("nav-mode", "products");
                }}
              >
                Browse all products
              </button>

              <h3 className="categories__prompt-heading">
                Have a specific product in mind?
              </h3>

              <div className="categories__search-container">
                <svg
                  className="categories__search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
                  <path d="M20 20l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                </svg>

                <input
                  type="text"
                  className="categories__search-input"
                  placeholder="What product or service ?"
                />

                <button
                  className="categories__search-button"
                  onClick={() => {
                    this.props.router.navigate("/search?type=products");
                    this.props.refreshService.trigger("nav-mode", "products");
                  }}
                >
                  Search suppliers
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="verified">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <h2>
            30,000+ verified Turkish suppliers with
            <br />
            trusted customer reviews.
          </h2>

          <div className="companies">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={10}
              slidesPerView="auto"
              centeredSlides={false}
              autoplay={{ delay: 3000 }}
              loop={true}
              navigation={{
                prevEl: '.verified .swiper-button-prev',
                nextEl: '.verified .swiper-button-next',
              }}
              pagination={{ clickable: true }}
            >
              {manufacturers.map(manufacturer => (
                <SwiperSlide key={manufacturer.id}>
                  <ManufacturerCard manufacturer={manufacturer} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="navigation-buttons">
              <button className="swiper-button-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="swiper-button-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="why">
            <h2 className="why__title">Why Businesses Trust Go Trade Türkiye</h2>
            <p className="why__subtitle">
              We help them connect with the best Turkish suppliers<br />
              with confidence.
            </p>

            <div className="why__grid">
              {/* CARD 1 */}
              <div className="why__card why__card--blue">
                <div className="why__card-header">
                  <img
                    src="/assets/why-icons/icon-search.png"
                    alt="Search and insights"
                    className="why__icon-img"
                    loading="lazy"
                    onError={(e) => {
                      console.warn('Icon failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 className="why__card-title">
                    The Best of Market Data &<br />
                    Supplier Insights
                  </h3>
                </div>

                <p className="why__card-text">
                  Our comprehensive data and market insights empower businesses to make informed decisions, ensuring they find the right Turkish suppliers.
                </p>
                <ul className="why__stats">
                  <li><strong>23,000+</strong> registered Turkish suppliers</li>
                  <li><strong>11,000+</strong> verified reviews from clients</li>
                  <li><strong>90k+</strong> projects facilitated by Turkish suppliers</li>
                </ul>
              </div>

              {/* CARD 2 - Handshake */}
              <div className="why__card why__card--beige">
                <div className="why__card-header">
                  <img
                    src="/assets/why-icons/icon-handshake.png"
                    alt="Partnership and collaboration"
                    className="why__icon-img"
                    loading="lazy"
                    onError={(e) => {
                      console.warn('Icon failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 className="why__card-title">
                    Proven to Drive Business<br />
                    Success
                  </h3>
                </div>
                <p className="why__card-text">
                  Every day, businesses around the world partner with Turkish suppliers listed on Go Trade Türkiye, achieving seamless and impactful results.
                </p>
                <div className="why__stats">
                  <strong>70k+ business partnerships started through Go Trade Türkiye</strong>
                </div>
              </div>

              {/* CARD 3 - Lightning Bolt */}
              <div className="why__card why__card--beige">
                <div className="why__card-header">
                  <img
                    src="/assets/why-icons/icon-bolt.png"
                    alt="Fast and efficient process"
                    className="why__icon-img"
                    loading="lazy"
                    onError={(e) => {
                      console.warn('Icon failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 className="why__card-title">
                    Simple, Quick & Agile Process
                  </h3>
                </div>
                <p className="why__card-text">
                  In just a few minutes, you can access a tailor-made selec-<br />
                  tion of Turkish suppliers that match your needs.
                </p>
                <div className="why__comparison">
                  <div className="why__comparison-item why__comparison-item--success">
                    <svg className="why__check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3333 4L6 11.3333L2.66666 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <strong>With GTT</strong>
                      <p>Search takes 10 mins</p>
                    </div>
                  </div>
                  <div className="why__comparison-item why__comparison-item--error">
                    <svg className="why__cross-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <strong>Without GTT</strong>
                      <p>Search can take weeks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4 - Target/Bullseye */}
              <div className="why__card why__card--beige">
                <div className="why__card-header">
                  <img
                    src="/assets/why-icons/icon-target.png"
                    alt="Personalized and targeted solutions"
                    className="why__icon-img"
                    loading="lazy"
                    onError={(e) => {
                      console.warn('Icon failed to load:', e.target.src);
                      e.target.style.display = 'none';
                    }}
                  />
                  <h3 className="why__card-title">
                    A Personalized Experience
                  </h3>
                </div>
                <p className="why__card-text">
                  Our expert team is available every step of the way to pro-<br />
                  vide guidance, combining the power of data with the<br />
                  human touch to ensure a seamless and personalized ex-<br />
                  perience.
                </p>
                <ul className="why__stats">
                  <li><strong>Real client reviews</strong> to guide your choices</li>
                  <li><strong>30+ experts</strong> ready to assist you on Go Trade Türkiye</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="next-level">
            <h2>Ready to take your business to the next level?</h2>
            <div>
              <button className="call-to-action" onClick={() => {
                this.props.router.navigate("/search?type=products");
                this.props.refreshService.trigger("nav-mode", "products");
              }}>
                Browse products
              </button>
              <button className="call-to-action red" onClick={() => {
                this.props.router.navigate("/search?type=suppliers");
                this.props.refreshService.trigger("nav-mode", "suppliers");
              }}>
                Search suppliers
              </button>
            </div>
          </div>
        </div>

        <div className="wrapper title">
          <h2>Join the Leading Community of Turkish Suppliers</h2>
        </div>

        <div className="wrapper boost">
          <div>
            <h3>
              Boost your revenue like
              <br />
              never before.
            </h3>
            <p>
              Each month, over 300,000 businesses search,
              <br />
              compare, and connect with suppliers like
              <br />
              yours on {AppConst.brandName}
            </p>

            <button className="call-to-action" onClick={() => {
              this.props.router.navigate("/become-member");
            }}>
              Add your company
            </button>
          </div>
          <div>
            <img loading="lazy" src="assets/homepage-boost.jpg" alt="Boost" />
          </div>
        </div>
      </div>
    );
  }
}
