// DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";

export default class DashboardLayout extends React.Component {
    menuItems = [];

    render() {
        return (
            <div className="dashboard">
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <ul>
                        {this.menuItems.map((item) => (
                            <li onClick={() => {
                                window.location.pathname = item.route;
                            }} key={item.label}>
                                <span className="icon">{item.icon}</span>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Section (Header + Content) */}
                <div className="main">
                    <header className="header">
                        <div className="header-left">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="header-right">
                            <span className="user">👤 User</span>
                            <button className="logout">Logout</button>
                        </div>
                    </header>

                    <main className="content">
                        <Outlet />
                    </main>
                </div>
            </div>
        );
    }
}
