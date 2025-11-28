import React, { Component } from "react";
import "./SupplierCampaignsOutlet.scss";

export default class SupplierCampaignsOutlet extends Component {
  state = {
    campaigns: [],
    loading: true,
    showModal: false,
    selectedCampaign: null,
    form: {
      product: "",
      startDate: "",
      endDate: "",
      newPrice: "",
      quantity: "",
    },
    products: [
      { id: 1, name: "Bluetooth Speaker" },
      { id: 2, name: "Smartwatch" },
      { id: 3, name: "Wireless Earbuds" },
    ],
  };

  componentDidMount() {
    this.fetchCampaigns();
  }

  // Simulate API call
  fetchCampaigns = async () => {
    this.setState({ loading: true });
    const fakeData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            product: "Bluetooth Speaker",
            startDate: "2025-10-01",
            endDate: "2025-10-15",
            newPrice: 39.99,
            quantity: 100,
            status: "running",
          },
          {
            id: 2,
            product: "Smartwatch",
            startDate: "2025-09-15",
            endDate: "2025-10-05",
            newPrice: 59.99,
            quantity: 200,
            status: "paused",
          },
          {
            id: 3,
            product: "Wireless Earbuds",
            startDate: "2025-08-01",
            endDate: "2025-08-31",
            newPrice: 19.99,
            quantity: 300,
            status: "stopped",
          },
        ]);
      }, 1000);
    });
    this.setState({ campaigns: fakeData, loading: false });
  };

  openModal = (campaign = null) => {
    this.setState({
      showModal: true,
      selectedCampaign: campaign,
      form: campaign
        ? { ...campaign }
        : { product: "", startDate: "", endDate: "", newPrice: "", quantity: "" },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedCampaign: null });
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      form: { ...prev.form, [name]: value },
    }));
  };

  handleSave = async () => {
    const { form, campaigns, selectedCampaign } = this.state;

    if (!form.product || !form.startDate || !form.endDate || !form.newPrice)
      return alert("Please fill all required fields.");

    // Simulated API save
    const success = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% chance success
      }, 1000);
    });

    if (!success) {
      alert("❌ Failed to save campaign (fake error). Try again.");
      return;
    }

    if (selectedCampaign) {
      const updated = campaigns.map((c) =>
        c.id === selectedCampaign.id ? { ...form, id: c.id, status: c.status } : c
      );
      this.setState({ campaigns: updated, showModal: false });
    } else {
      const newCampaign = {
        id: Date.now(),
        ...form,
        status: "draft",
      };
      this.setState({
        campaigns: [newCampaign, ...campaigns],
        showModal: false,
      });
    }

    alert("✅ Campaign saved successfully (fake success).");
  };

  updateStatus = (id, status) => {
    const actions = {
      pause: "paused",
      resume: "running",
      stop: "stopped",
      draft: "draft",
    };

    this.setState((prev) => ({
      campaigns: prev.campaigns.map((c) =>
        c.id === id ? { ...c, status: actions[status] || c.status } : c
      ),
    }));
  };

  deleteCampaign = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm) return;

    const success = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% success
      }, 800);
    });

    if (!success) {
      alert("❌ Failed to delete campaign (fake error).");
      return;
    }

    this.setState((prev) => ({
      campaigns: prev.campaigns.filter((c) => c.id !== id),
    }));
    alert("🗑️ Campaign deleted successfully.");
  };

  renderStatus(status) {
    return <span className={`status ${status}`}>{status}</span>;
  }

  render() {
    const {
      campaigns,
      loading,
      showModal,
      form,
      products,
      selectedCampaign,
    } = this.state;

    return (
      <div className="campaigns-page">
        <div className="page-header">
          <h1>Campaigns</h1>
          <button className="new-btn" onClick={() => this.openModal()}>
            + New Campaign
          </button>
        </div>

        {loading ? (
          <p className="loading">Loading campaigns...</p>
        ) : (
          <div className="campaigns-list">
            {campaigns.map((c) => (
              <div key={c.id} className="campaign-card">
                <div className="top">
                  <h2>{c.product}</h2>
                  {this.renderStatus(c.status)}
                </div>

                <p className="details">
                  {c.startDate} → {c.endDate}
                </p>
                <p className="meta">
                  Price: ${c.newPrice} | Qty: {c.quantity || "∞"}
                </p>

                <div className="actions">
                  {c.status === "running" ? (
                    <button onClick={() => this.updateStatus(c.id, "pause")}>
                      ⏸ Pause
                    </button>
                  ) : c.status === "paused" ? (
                    <button onClick={() => this.updateStatus(c.id, "resume")}>
                      ▶ Resume
                    </button>
                  ) : null}

                  {c.status !== "stopped" && (
                    <button onClick={() => this.updateStatus(c.id, "stop")}>
                      ⛔ Stop
                    </button>
                  )}

                  <button onClick={() => this.openModal(c)}>✏ Edit</button>
                  <button className="delete" onClick={() => this.deleteCampaign(c.id)}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}

            {campaigns.length === 0 && (
              <p className="no-campaigns">No campaigns found.</p>
            )}
          </div>
        )}

        {/* MODAL FORM */}
        {showModal && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedCampaign ? "Edit Campaign" : "New Campaign"}</h2>
                <button className="close-btn" onClick={this.closeModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <label>Product *</label>
                <select
                  name="product"
                  value={form.product}
                  onChange={this.handleFormChange}
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <div className="dates">
                  <div>
                    <label>Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={this.handleFormChange}
                    />
                  </div>
                  <div>
                    <label>End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={this.handleFormChange}
                    />
                  </div>
                </div>

                <label>New Price *</label>
                <input
                  type="number"
                  name="newPrice"
                  value={form.newPrice}
                  onChange={this.handleFormChange}
                  placeholder="e.g. 29.99"
                />

                <label>Quantity (optional)</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={this.handleFormChange}
                  placeholder="e.g. 100"
                />
              </div>

              <div className="modal-footer">
                <button onClick={this.handleSave}>Save Campaign</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
