import React, { useRef, useState } from "react";
import "./HeaderDropdown.scss";
import ManufacturerCard from "./ManufacturerCard";
import ManufacturerRepository from "../repository/ManufacturerRepository";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HeaderDropdown = ({ menu, onClose }) => {
  const dropdownRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const subcategoryMenuRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [manufacturers, setManufacturers] = useState([]);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight] = useState(40); // fixed small thumb height in px
  const isPointerOverThumb = useRef(false);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartTop = useRef(0);
  const [subThumbTop, setSubThumbTop] = useState(0);
  const [subThumbHeight] = useState(40);
  const isSubDragging = useRef(false);
  const subDragStartY = useRef(0);
  const subDragStartTop = useRef(0);

  // Removed the internal handleClickOutside useEffect because Header.js
  // already handles clicking outside via the menuRef on the parent container.
  // This prevents the conflict where clicking the toggle button would close and immediately re-open the menu.

  // If menu is loading or empty, we can still show the container or a loading state
  // instead of returning null, so you can verify the design works.

  console.log("HeaderDropdown menu:", menu);
  const hasItems = menu && Array.isArray(menu) && menu.length > 0;

  // Set first category as selected by default
  React.useEffect(() => {
    if (hasItems && !selectedCategory) {
      setSelectedCategory(menu[0]);
    }
  }, [hasItems, menu, selectedCategory]);

  // Fetch manufacturers for a category slug and set the first as selected
  const fetchManufacturersForCategory = async (slug) => {
    try {
      const list = await ManufacturerRepository.searchByCategory(slug);
      setManufacturers(list || []);
      if (list && list.length > 0) {
        setSelectedManufacturer(list[0]);
      } else {
        setSelectedManufacturer(null);
      }
    } catch (e) {
      console.error("Failed to fetch manufacturers for category:", e);
      setManufacturers([]);
      setSelectedManufacturer(null);
    }
  };

  // When selectedCategory changes (including initial), fetch manufacturers
  React.useEffect(() => {
    if (selectedCategory && selectedCategory.slug) {
      fetchManufacturersForCategory(selectedCategory.slug);
    }
  }, [selectedCategory]);

  // Update custom thumb position on scroll
  React.useEffect(() => {
    const el = categoryMenuRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxTop = Math.max(clientHeight - thumbHeight, 0);
      const ratio = scrollTop / Math.max(scrollHeight - clientHeight, 1);
      setThumbTop(ratio * maxTop);
    };

    update();
    el.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [thumbHeight, menu]);

  // Update subcategory thumb position on scroll
  React.useEffect(() => {
    const el = subcategoryMenuRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxTop = Math.max(clientHeight - subThumbHeight, 0);
      const ratio = scrollTop / Math.max(scrollHeight - clientHeight, 1);
      setSubThumbTop(ratio * maxTop);
    };

    update();
    el.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [subThumbHeight, selectedCategory]);

  return (
    <div className="industry-dropdown">
      <div className="industry-dropdown-menu" ref={dropdownRef}>
        <div className="industry-dropdown-menu__category-menu">
          <div className="category-menu-inner" ref={categoryMenuRef}>
            <ul className="dropdown-list">
              {hasItems ? (
                menu.map((category, index) => (
                  <li
                    key={index}
                    className={
                      selectedCategory?.slug === category.slug ? "active" : ""
                    }
                    onMouseEnter={() => {
                      setSelectedCategory(category);
                      fetchManufacturersForCategory(category.slug);
                    }}
                  >
                    <a href={`/c/${category.slug}`} onClick={onClose}>
                      {category.name}
                      {category.categories &&
                        category.categories.length > 0 && (
                          <span className="count">
                            {" "}
                            [{category.categories.length}]
                          </span>
                        )}
                    </a>
                  </li>
                ))
              ) : (
                <li className="empty-state">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Custom scrollbar  */}
          <div
            className="custom-scrollbar"
            style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
            onWheel={(e) => {
              const el = categoryMenuRef.current;
              if (!el) return;
              e.preventDefault();
              el.scrollBy({ top: e.deltaY, behavior: "auto" });
            }}
            onMouseEnter={() => {
              isPointerOverThumb.current = true;
            }}
            onMouseLeave={() => {
              isPointerOverThumb.current = false;
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const el = categoryMenuRef.current;
              if (!el) return;
              isDragging.current = true;
              dragStartY.current = e.clientY;
              dragStartTop.current = thumbTop;

              const onMove = (ev) => {
                if (!isDragging.current) return;
                const clientY = ev.clientY;
                const delta = clientY - dragStartY.current;
                const clientHeight = el.clientHeight;
                const scrollHeight = el.scrollHeight;
                const maxTop = Math.max(clientHeight - thumbHeight, 0);
                const newTop = Math.min(
                  Math.max(dragStartTop.current + delta, 0),
                  maxTop
                );
                setThumbTop(newTop);
                const maxScroll = Math.max(scrollHeight - clientHeight, 0);
                const scrollTop =
                  maxTop > 0 ? (newTop / maxTop) * maxScroll : 0;
                el.scrollTop = scrollTop;
              };

              const onUp = () => {
                isDragging.current = false;
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };

              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const el = categoryMenuRef.current;
              if (!el || !touch) return;
              isDragging.current = true;
              dragStartY.current = touch.clientY;
              dragStartTop.current = thumbTop;

              const onTouchMove = (ev) => {
                if (!isDragging.current) return;
                const t = ev.touches[0];
                const delta = t.clientY - dragStartY.current;
                const clientHeight = el.clientHeight;
                const scrollHeight = el.scrollHeight;
                const maxTop = Math.max(clientHeight - thumbHeight, 0);
                const newTop = Math.min(
                  Math.max(dragStartTop.current + delta, 0),
                  maxTop
                );
                setThumbTop(newTop);
                const maxScroll = Math.max(scrollHeight - clientHeight, 0);
                const scrollTop =
                  maxTop > 0 ? (newTop / maxTop) * maxScroll : 0;
                el.scrollTop = scrollTop;
              };

              const onTouchEnd = () => {
                isDragging.current = false;
                window.removeEventListener("touchmove", onTouchMove);
                window.removeEventListener("touchend", onTouchEnd);
              };

              window.addEventListener("touchmove", onTouchMove, {
                passive: false,
              });
              window.addEventListener("touchend", onTouchEnd);
            }}
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
                  {selectedCategory.categories.map((subcategory, index) => (
                    <li key={index}>
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
                style={{
                  height: `${subThumbHeight}px`,
                  top: `${subThumbTop}px`,
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const el = subcategoryMenuRef.current;
                  if (!el) return;
                  isSubDragging.current = true;
                  subDragStartY.current = e.clientY;
                  subDragStartTop.current = subThumbTop;

                  const onMove = (ev) => {
                    if (!isSubDragging.current) return;
                    const clientY = ev.clientY;
                    const delta = clientY - subDragStartY.current;
                    const clientHeight = el.clientHeight;
                    const scrollHeight = el.scrollHeight;
                    const maxTop = Math.max(clientHeight - subThumbHeight, 0);
                    const newTop = Math.min(
                      Math.max(subDragStartTop.current + delta, 0),
                      maxTop
                    );
                    setSubThumbTop(newTop);
                    const maxScroll = Math.max(scrollHeight - clientHeight, 0);
                    const scrollTop =
                      maxTop > 0 ? (newTop / maxTop) * maxScroll : 0;
                    el.scrollTop = scrollTop;
                  };

                  const onUp = () => {
                    isSubDragging.current = false;
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("mouseup", onUp);
                  };

                  window.addEventListener("mousemove", onMove);
                  window.addEventListener("mouseup", onUp);
                }}
              />
            </>
          ) : (
            <p className="no-subcategories">No subcategories available</p>
          )}
        </div>
          <div className="industry-dropdown-menu__company-card">
            {manufacturers && manufacturers.length > 0 ? (
              <div className="manufacturer-swiper">
                <button className="swiper-button-prev">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={10}
                  slidesPerView="auto"
                  centeredSlides={false}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  navigation={{
                    prevEl: '.industry-dropdown-menu__company-card .swiper-button-prev',
                    nextEl: '.industry-dropdown-menu__company-card .swiper-button-next',
                  }}
                >
                  {manufacturers.map((m) => (
                    <SwiperSlide key={m.id} style={{ width: 320 }}>
                      <ManufacturerCard manufacturer={m} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="swiper-button-next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
