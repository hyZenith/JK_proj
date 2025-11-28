import DashboardLayout from "./DashboardLayout";
import { FaHome, FaStore, FaBoxOpen, FaEnvelope, FaStar, FaLifeRing } from "react-icons/fa";

export default class SupplierDashboardLayout extends DashboardLayout {

    menuItems = [
        { label: "Dashboard", icon: <FaHome />, route: "/dashboard" },
        { label: "My Store", icon: <FaStore />, route: "/dashboard/profile" },
        { label: "Products", icon: <FaBoxOpen />, route: "/dashboard/products" },
        { label: "Campaigns", icon: <FaBoxOpen />, route: "/dashboard/campaigns" },
        { label: "Inquiries", icon: <FaEnvelope />, route: "/dashboard/inquiries" },
        { label: "My Subscription", icon: <FaStar />, route: "/dashboard/subscription" },
        { label: "Support", icon: <FaLifeRing />, route: "/dashboard/support" },
    ];

}