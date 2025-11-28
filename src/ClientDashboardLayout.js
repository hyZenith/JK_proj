import DashboardLayout from "./DashboardLayout";
import {  FaHeart, FaBoxOpen, FaLifeRing, FaUser, FaBookmark } from "react-icons/fa";

export default class ClientDashboardLayout extends DashboardLayout {

    menuItems = [
        // { label: "Deals", icon: <FaBoxOpen /> , route: "/my"},
        { label: "Inquiries", icon: <FaBoxOpen /> , route: "/my/inquiries"},
        { label: "Saved Products", icon: <FaHeart /> , route: "/my/favorites"},
        { label: "Saved Suppliers", icon: <FaBookmark /> , route: "/my/suppliers"},
        { label: "Profile", icon: <FaUser /> , route: "/my/profile"},
        { label: "Support", icon: <FaLifeRing /> , route: "/my/support"},
    ];

}