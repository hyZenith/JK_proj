import React, { useRef, useState } from "react";
import "./HeaderDropdown.scss";

const HeaderDropdown = ({ menu, onClose }) => {
  const dropdownRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
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

  return (
    <div className="industry-dropdown" ref={dropdownRef}>
      <div className="industry-dropdown__category-menu">
        <ul className="dropdown-list">
          {hasItems ? (
            menu.map((category, index) => (
              <li 
                key={index}
                className={selectedCategory?.slug === category.slug ? 'active' : ''}
                onMouseEnter={() => setSelectedCategory(category)}
              >
                <a href={`/c/${category.slug}`} onClick={onClose}>
                  {category.name}
                  {category.categories && category.categories.length > 0 && (
                    <span className="count"> [{category.categories.length}]</span>
                  )}
                </a>
              </li>
            ))
          ) : (
            <li className="empty-state">Loading categories...</li>
          )}
        </ul>
      </div>
      <div className="industry-dropdown__subcategory-menu">
        {selectedCategory && selectedCategory.categories && selectedCategory.categories.length > 0 ? (
          <>
            <h4 className="subcategory-title">{selectedCategory.name}</h4>
            <ul className="subcategory-list">
              {selectedCategory.categories.map((subcategory, index) => (
                <li key={index}>
                  <a href={`/c/${selectedCategory.slug}/${subcategory.slug}`} onClick={onClose}>
                    {subcategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="no-subcategories">No subcategories available</p>
        )}
      </div>
      <div className="industry-dropdown__company-card">
            company card
      </div>
    </div>
  );
};

export default HeaderDropdown;
