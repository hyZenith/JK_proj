import React from "react";
import "./HeaderMenu.scss";

export class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategory: null,
        };
        this.menuRef = React.createRef();
        this.hoverTimeout = null;
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
    }

    handleClickOutside = (event) => {
        const { onClose } = this.props;
        if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
            this.setState({ activeCategory: null });
            if (onClose) onClose();
        }
    };

    handleMouseEnter = (slug) => {
        // Clear any existing timeout
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        this.setState({ activeCategory: slug });
    };

    handleMouseLeave = () => {
        // Add small delay before closing to allow moving to submenu
        this.hoverTimeout = setTimeout(() => {
            this.setState({ activeCategory: null });
        }, 150);
    };

    handleSubmenuEnter = () => {
        // Clear timeout when entering submenu
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
    };

    handleSubmenuLeave = () => {
        this.hoverTimeout = setTimeout(() => {
            this.setState({ activeCategory: null });
        }, 150);
    };

    handleCategoryClick = (url, slug) => {
        const { onClose } = this.props;
        // If category has no submenu, close the menu and navigate
        if (!url && !this.hasSubmenu(slug)) {
            this.setState({ activeCategory: null });
            if (onClose) onClose();
        }
    };

    hasSubmenu = (slug) => {
        const { menu } = this.props;
        if (!menu?.links) return false;
        
        const menuItem = menu.links.find(l => l.category?.slug === slug);
        return menuItem?.menu?.links && menuItem.menu.links.length > 0;
    };

    renderSubmenu = (links) => {
        if (!links || links.length === 0) return null;

        return (
            <ul className="submenu-panel">
                {links.map((link, index) => (
                    <li key={link.category?.slug || `submenu-${index}`} className="submenu-item">
                        <a 
                            href={link.url || (link.category ? `/c/${link.category.slug}` : '#')}
                            onClick={() => {
                                this.setState({ activeCategory: null });
                                if (this.props.onClose) this.props.onClose();
                            }}
                        >
                            {link.category?.name || 'Unnamed Category'}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const { menu, onClose } = this.props;
        const { activeCategory } = this.state;
        
        if (!menu?.links || menu.links.length === 0) {
            console.warn('HeaderMenu: No menu data provided');
            return null;
        }

        const activeMenuItem = menu.links.find(
            l => l.category?.slug === activeCategory && l.menu?.links && l.menu.links.length > 0
        );

        return (
            <>
                {/* Dark overlay */}
                <div
                    className="menu-overlay"
                    onClick={() => {
                        this.setState({ activeCategory: null });
                        if (onClose) onClose();
                    }}
                />

                <div className="header-menu-wrapper" ref={this.menuRef}>
                    {/* Left Sidebar - Main Categories */}
                    <ul className="menu-level-1">
                        {menu.links.map((link, index) => {
                            const hasSubmenu = this.hasSubmenu(link.category?.slug);
                            return (
                                <li
                                    key={link.category?.slug || `menu-${index}`}
                                    className={`menu-level-1-item ${hasSubmenu ? 'has-submenu' : ''} ${activeCategory === link.category?.slug ? 'active' : ''}`}
                                    onMouseEnter={() => this.handleMouseEnter(link.category?.slug)}
                                    onMouseLeave={this.handleMouseLeave}
                                >
                                    <a 
                                        href={link.url || (link.category ? `/c/${link.category.slug}` : '#')}
                                        onClick={(e) => {
                                            if (!hasSubmenu) {
                                                this.handleCategoryClick(link.url, link.category?.slug);
                                            } else {
                                                e.preventDefault(); // Prevent navigation if has submenu
                                            }
                                        }}
                                    >
                                        {link.category?.name || 'Unnamed Category'}
                                        {hasSubmenu && <span className="submenu-arrow">›</span>}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right Panel - Submenu */}
                    {activeMenuItem && (
                        <div
                            className="submenu-container"
                            onMouseEnter={this.handleSubmenuEnter}
                            onMouseLeave={this.handleSubmenuLeave}
                        >
                            <div className="submenu-header">
                                <h3>{activeMenuItem.category?.name}</h3>
                            </div>
                            {this.renderSubmenu(activeMenuItem.menu.links)}
                        </div>
                    )}
                </div>
            </>
        );
    }
}