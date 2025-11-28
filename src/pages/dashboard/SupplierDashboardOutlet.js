import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./SupplierDashboardOutlet.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default class SupplierDashboardOutlet extends Component {
    state = {
        dateRange: "last_30_days",
        profileVisits: this.generateFakeData(30),
        impressions: this.generateFakeData(30),
        contacts: this.generateFakeData(30),
        offersReceived: this.generateFakeData(30)
    };

    // TODO: Replace this with real API calls
    generateFakeData(days) {
        const labels = [];
        const data = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            labels.push(d.toISOString().split("T")[0]);
            data.push(Math.floor(Math.random() * 500) + 50); // Random data
        }
        return { labels, data };
    }

    handleDateRangeChange = (e) => {
        const range = e.target.value;
        let days = 30;
        if (range === "last_7_days") days = 7;
        if (range === "last_90_days") days = 90;

        this.setState({
            dateRange: range,
            profileVisits: this.generateFakeData(days),
            impressions: this.generateFakeData(days),
            contacts: this.generateFakeData(days),
            offersReceived: this.generateFakeData(days)
        });
    };

    renderChart(title, chartData, type = "line", color = "#4e73df") {
        const data = {
            labels: chartData.labels,
            datasets: [
                {
                    label: title,
                    data: chartData.data,
                    borderColor: type === "line" ? color : undefined,
                    backgroundColor: type === "bar" ? color : "rgba(78, 115, 223, 0.2)",
                    tension: 0.3
                }
            ]
        };

        return type === "line" ? <Line data={data} /> : <Bar data={data} />;
    }

    render() {
        const { profileVisits, impressions, contacts, offersReceived, dateRange } = this.state;

        return (
            <div className="supplier-dashboard">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <select value={dateRange} onChange={this.handleDateRangeChange}>
                        <option value="last_7_days">Last 7 days</option>
                        <option value="last_30_days">Last 30 days</option>
                        <option value="last_90_days">Last 90 days</option>
                    </select>
                </div>

                <div className="charts-container">
                    <div className="chart-card">{this.renderChart("Profile Visits", profileVisits)}</div>
                    <div className="chart-card">{this.renderChart("Impressions", impressions, "line", "#1cc88a")}</div>
                    <div className="chart-card">{this.renderChart("Number of Contacts", contacts, "bar", "#f6c23e")}</div>
                    <div className="chart-card">{this.renderChart("Offers Received", offersReceived, "bar", "#e74a3b")}</div>
                </div>
            </div>
        );
    }
}
