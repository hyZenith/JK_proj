import DashboardLayout from "./DashboardLayout";
import { FaEnvelope, FaBoxOpen, FaStar, FaHome, FaTags, FaFileAlt, FaImage, FaPage4, FaSearch, FaUsers, FaStore, FaShoppingCart } from "react-icons/fa";

export default class SupplierDashboardLayout extends DashboardLayout {

    menuItems = [
        { label: "Dashboard", icon: <FaHome /> },
        { label: "Categories", icon: <FaTags /> },
        { label: "Articles", icon: <FaFileAlt /> },
        { label: "Medias", icon: <FaImage /> },
        { label: "Pages", icon: <FaPage4 /> },
        { label: "SEO", icon: <FaSearch /> },
        { label: "Tags", icon: <FaTags /> },
        { label: "Menus", icon: <FaFileAlt /> },
        { label: "Links", icon: <FaFileAlt /> },
        { label: "Conversations", icon: <FaEnvelope /> },
        { label: "Follows", icon: <FaUsers /> },
        { label: "Members", icon: <FaUsers /> },
        { label: "Products", icon: <FaBoxOpen /> },
        { label: "Orders", icon: <FaShoppingCart /> },
        { label: "Reviews", icon: <FaStar /> },
        { label: "Users", icon: <FaUsers /> },
        { label: "Stores", icon: <FaStore /> },
        { label: "Plans", icon: <FaStar /> },
        { label: "Plan Features", icon: <FaStar /> },
        { label: "Storages", icon: <FaFileAlt /> },
        { label: "Parameters", icon: <FaFileAlt /> },
    ];

}