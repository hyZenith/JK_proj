import React, { useRef, useState, useEffect, useCallback } from "react";
import "./HeaderDropdown.scss";
import ManufacturerCard from "./ManufacturerCard";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const useCustomScrollbar = (containerRef, thumbHeight = 40, deps = []) => {
  const [thumbTop, setThumbTop] = useState(0);
  const dragState = useRef({ active: false, startY: 0, startTop: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return setThumbTop(0);
      const maxTop = Math.max(clientHeight - thumbHeight, 0);
      setThumbTop((scrollTop / maxScroll) * maxTop);
    };

    update();
    el.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [containerRef, thumbHeight, ...deps]);

  const handleDrag = useCallback((clientY, isStart = false) => {
    const el = containerRef.current;
    if (!el) return;

    if (isStart) {
      dragState.current = { active: true, startY: clientY, startTop: thumbTop };
      return;
    }

    if (!dragState.current.active) return;

    const { clientHeight, scrollHeight } = el;
    const delta = clientY - dragState.current.startY;
    const maxTop = Math.max(clientHeight - thumbHeight, 0);
    const newTop = Math.max(0, Math.min(dragState.current.startTop + delta, maxTop));
    setThumbTop(newTop);

    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0 && maxTop > 0) {
      el.scrollTop = (newTop / maxTop) * maxScroll;
    }
  }, [containerRef, thumbHeight, thumbTop]);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    handleDrag(e.clientY, true);
    const move = (ev) => handleDrag(ev.clientY);
    const up = () => {
      dragState.current.active = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [handleDrag]);

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    if (!touch) return;
    e.preventDefault();
    handleDrag(touch.clientY, true);
    const move = (ev) => {
      if (dragState.current.active && ev.touches[0]) {
        handleDrag(ev.touches[0].clientY);
      }
    };
    const end = () => {
      dragState.current.active = false;
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
  }, [handleDrag]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    containerRef.current?.scrollBy({ top: e.deltaY, behavior: "auto" });
  }, [containerRef]);

  return { thumbTop, thumbHeight, onMouseDown, onTouchStart, onWheel };
};

const HeaderDropdown = ({ menu, onClose }) => {
  const categoryMenuRef = useRef(null);
  const subcategoryMenuRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [manufacturers, setManufacturers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryScrollbar = useCustomScrollbar(categoryMenuRef, 40, [menu]);
  const subcategoryScrollbar = useCustomScrollbar(subcategoryMenuRef, 40, [selectedCategory]);


  const hasItems = menu && Array.isArray(menu) && menu.length > 0;

  useEffect(() => {
    if (hasItems && !selectedCategory) {
      setSelectedCategory(menu[0]);
    }
  }, [hasItems, menu, selectedCategory]);

  const fetchManufacturersForCategory = useCallback(async (slug) => {
    try {
      const list = await ManufacturerRepository.searchByCategory(slug);
      const arr = list || [];
      setManufacturers(arr);
      setCurrentIndex(0);
      setSelectedManufacturer(arr.length > 0 ? arr[0] : null);
    } catch (e) {
      console.error("Failed to fetch manufacturers for category:", e);
      setManufacturers([]);
      setSelectedManufacturer(null);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory?.slug) {
      fetchManufacturersForCategory(selectedCategory.slug);
    }
  }, [selectedCategory, fetchManufacturersForCategory]);

  // Navigation handlers
  const handleCategoryHover = useCallback((category) => {
    setSelectedCategory(category);
    fetchManufacturersForCategory(category.slug);
  }, [fetchManufacturersForCategory]);

  const handleManufacturerNavigation = useCallback((direction) => {
    if (manufacturers.length === 0) return;
    const len = manufacturers.length;
    const next = direction === 'next' 
      ? (currentIndex + 1) % len 
      : (currentIndex - 1 + len) % len;
    setCurrentIndex(next);
    setSelectedManufacturer(manufacturers[next]);
  }, [manufacturers, currentIndex]);

  return (
    <div className="industry-dropdown">
      <div className="industry-dropdown-menu">
        <div className="industry-dropdown-menu__category-menu">
          <div className="category-menu-inner" ref={categoryMenuRef}>
            <ul className="dropdown-list">
              {hasItems ? (
                menu.map((category) => (
                  <li
                    key={category.slug || category.id || category.name}
                    className={
                      selectedCategory?.slug === category.slug ? "active" : ""
                    }
                    onMouseEnter={() => handleCategoryHover(category)}
                  >
                    <a href={`/c/${category.slug}`} onClick={onClose}>
                      {category.name}
                    </a>
                  </li>
                ))
              ) : (
                <li className="empty-state">Loading categories...</li>
              )}
            </ul>
          </div>

          <div
            className="custom-scrollbar"
            style={{ height: `${categoryScrollbar.thumbHeight}px`, top: `${categoryScrollbar.thumbTop}px` }}
            {...categoryScrollbar}
          />
        </div>
        <div className="industry-dropdown-menu__subcategory-menu">
          {selectedCategory &&
          selectedCategory.categories &&
          selectedCategory.categories.length > 0 ? (
            <>
              <h4 className="subcategory-title">{selectedCategory.name}</h4>
              <div className="subcategory-menu-inner" ref={subcategoryMenuRef}>
                <ul className="subcategory-list">
                  {selectedCategory.categories.map((subcategory) => (
                    <li key={subcategory.slug || subcategory.id || subcategory.name}>
                      <a
                        href={`/c/${selectedCategory.slug}/${subcategory.slug}`}
                        onClick={onClose}
                      >
                        {subcategory.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="custom-scrollbar sub-custom-scrollbar"
                style={{ height: `${subcategoryScrollbar.thumbHeight}px`, top: `${subcategoryScrollbar.thumbTop}px` }}
                {...subcategoryScrollbar}
              />
            </>
          ) : (
            <p className="no-subcategories">No subcategories available</p>
          )}
        </div>
        <div className="industry-dropdown-menu__company-card">
          {manufacturers && manufacturers.length > 0 ? (
            <div className="manufacturer-swiper">
              <button
                className="swiper-button-prev"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleManufacturerNavigation('prev');
                }}
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 185.34 185.34"
                  xmlSpace="preserve"
                  transform="rotate(180)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
              </button>

              <ManufacturerCard
                manufacturer={manufacturers[currentIndex]}
                className="company"
              />

              <button
                className="swiper-button-next"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleManufacturerNavigation('next');
                }}
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 185.34 185.34"
                  xmlSpace="preserve"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
              </button>
            </div>
          ) : (
            <ManufacturerCard manufacturer={selectedManufacturer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
