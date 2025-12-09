// Header.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Header.scss";
import { FaSearch, FaBars, FaAngleDown, FaUser } from "react-icons/fa";
import AppConst from "../AppConst";

// --- START HEADERMENU COMPONENT ---
const HeaderMenu = ({ menu, onClose }) => {
  if (!menu || !Array.isArray(menu)) return null;

  return (
    <div className="main-menu">
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            <a href={item.url} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
// --- END HEADERMENU COMPONENT ---

// --- START DROPDOWN MENU COMPONENT ---
const DropdownMenu = ({ items, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!items || !Array.isArray(items)) return null;

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              onClick={onClose}
              role="menuitem"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
// --- END DROPDOWN MENU COMPONENT ---

const Header = ({ router, refreshService }) => {
  const menuRef = useRef(null);
  const buyerDropdownRef = useRef(null);
  const supportDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const initNavMode = () => {
    const q = router?.query?.type;
    if (q) {
      localStorage.setItem("nav-mode", q);
      return q;
    }
    return localStorage.getItem("nav-mode") || "products";
  };

  const [user] = useState(() => {
    const u = sessionStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [mainMenu, setMainMenu] = useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationMode, setNavigationMode] = useState(initNavMode);

  // Dropdown states
  const [isBuyerDropdownOpen, setIsBuyerDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  

  const userMenuItems = user ? [
    { label: "My Profile", url: "/my/profile" },
    { label: "My Orders", url: "/my/orders" },
    { label: "Settings", url: "/my/settings" },
    { label: "Logout", url: "/logout" }
  ] : [
    { label: "Sign In", url: "/auth/login" },
    { label: "Register", url: "/auth/register" }
  ];

  const fetchMenu = useCallback(async () => {
    try {
      const res = await fetch(AppConst.api(AppConst.mainMenu));
      if (res.ok) setMainMenu(await res.json());
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    if (!refreshService) return;
    const update = (m) => {
      localStorage.setItem("nav-mode", m);
      setNavigationMode(m);
    };
    refreshService.subscribe("nav-mode", update);
  }, [refreshService]);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Main menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMainMenuOpen(false);
      }

      // Buyer dropdown
      if (buyerDropdownRef.current && !buyerDropdownRef.current.contains(e.target)) {
        setIsBuyerDropdownOpen(false);
      }

      // Support dropdown
      if (supportDropdownRef.current && !supportDropdownRef.current.contains(e.target)) {
        setIsSupportDropdownOpen(false);
      }

      // User dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router?.navigate(
      `/search?q=${encodeURIComponent(searchQuery)}&type=${navigationMode}`
    );
  };

  const toggleBuyerDropdown = () => {
    setIsBuyerDropdownOpen(!isBuyerDropdownOpen);
    setIsSupportDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleSupportDropdown = () => {
    setIsSupportDropdownOpen(!isSupportDropdownOpen);
    setIsBuyerDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsBuyerDropdownOpen(false);
    setIsSupportDropdownOpen(false);
  };

  const handleUserAction = () => {
    if (!user) {
      router?.navigate("/auth/login");
    } else {
      toggleUserDropdown();
    }
  };

  return (
    <header className="main-header-wrapper">
      {/* Row 1 */}
      <div className="top-header">
        <div className="header-container row-1">
          <a className="brand-logo" href="/" aria-label="GoTrade Türkiye Home">
            <img src="/assets/logo.png" alt="GoTrade Türkiye" loading="lazy" />
          </a>

          <div className="search-wrapper" ref={menuRef}>
            <form className="search-bar" onSubmit={onSubmit}>
              <button
                type="button"
                className="hamburger-btn"
                aria-label="Toggle menu"
                aria-expanded={isMainMenuOpen}
                onClick={() => setIsMainMenuOpen((v) => !v)}
              >
                <FaBars />
              </button>
              <input
                className="search-input"
                placeholder="Find your supplier"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search input"
              />
              <button
                type="submit"
                className="search-icon-btn"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>
            {isMainMenuOpen && mainMenu && (
              <HeaderMenu
                menu={mainMenu}
                onClose={() => setIsMainMenuOpen(false)}
              />
            )}
          </div>

          <button
            className="add-company-btn"
            onClick={() => router?.navigate("/company-pricing")}
            aria-label="Add your company"
          >
            Add your company
          </button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="bottom-nav">
        <div className="header-container row-2">
          <div className="left-nav">
            <div className="dropdown-wrapper" ref={buyerDropdownRef}>
              <button
                className="nav-link"
                onClick={toggleBuyerDropdown}
                aria-expanded={isBuyerDropdownOpen}
                aria-haspopup="true"
              >
                Buyer Central <FaAngleDown />
              </button>
            </div>

            <div className="dropdown-wrapper" ref={supportDropdownRef}>
              <button
                className="nav-link"
                onClick={toggleSupportDropdown}
                aria-expanded={isSupportDropdownOpen}
                aria-haspopup="true"
              >
                Support <FaAngleDown />
              </button>
            </div>
          </div>

          <div className="right-nav">
            <div className="dropdown-wrapper" ref={userDropdownRef}>
              {!user ? (
                <button
                  className="nav-link"
                  onClick={handleUserAction}
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  Hello,{" "}
                  <span className="user-icon">
                    <FaUser />
                  </span>
                  <span className="red-text">sign in</span> <FaAngleDown />
                </button>
              ) : (
                <button
                  className="nav-link"
                  onClick={toggleUserDropdown}
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  Hello, {user.name || user.email} <FaAngleDown />
                </button>
              )}
              {isUserDropdownOpen && (
                <DropdownMenu
                  items={userMenuItems}
                  onClose={() => setIsUserDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;