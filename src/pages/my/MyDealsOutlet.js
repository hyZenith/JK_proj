import React, { Component } from "react";
import "./MyDealsOutlet.scss";

class MyDealsOutlet extends Component {
  state = {
    deals: [],
    loading: true,
    showModal: false,
    selectedDeal: null,
    conversation: [],
    newMessage: "",
  };

  componentDidMount() {
    this.fetchDeals();
  }

  fetchDeals = async () => {
    this.setState({ loading: true });
    const fakeDeals = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            product: "Bluetooth Speaker",
            supplier: "TechZone Ltd",
            country: "Germany",
            price: 39.99,
            quantity: 100,
            status: "pending",
            sentAt: "2025-10-01",
          },
          {
            id: 2,
            product: "Smartwatch",
            supplier: "GadgetWorld Inc.",
            country: "France",
            price: 59.99,
            quantity: 50,
            status: "pending",
            sentAt: "2025-09-29",
          },
        ]);
      }, 1000);
    });

    this.setState({ deals: fakeDeals, loading: false });
  };

  openDeal = (deal) => {
    const fakeConversation = [
      { from: "supplier", text: `Hello, special deal on ${deal.product} for you.` },
      { from: "buyer", text: "Thanks! Can you deliver faster?" },
      { from: "supplier", text: "Yes, we can deliver in 3 days." },
    ];

    this.setState({ selectedDeal: deal, showModal: true, conversation: fakeConversation });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedDeal: null, conversation: [], newMessage: "" });
  };

  handleSendMessage = () => {
    const { newMessage, conversation } = this.state;
    if (!newMessage.trim()) return;

    this.setState({
      conversation: [...conversation, { from: "buyer", text: newMessage }],
      newMessage: "",
    });

    // Fake supplier response
    setTimeout(() => {
      this.setState((prev) => ({
        conversation: [
          ...prev.conversation,
          { from: "supplier", text: "Thank you for your message. We will respond shortly." },
        ],
      }));
    }, 1000);
  };

  renderStatus(status) {
    return <span className={`status ${status}`}>{status}</span>;
  }

  render() {
    const { deals, loading, showModal, selectedDeal, conversation, newMessage } = this.state;

    return (
      <div className="buyer-deals-page">
        <h1>My Deals</h1>

        {loading ? (
          <p>Loading deals...</p>
        ) : deals.length === 0 ? (
          <p>No deals available.</p>
        ) : (
          <div className="deals-list">
            {deals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <div className="top">
                  <h2>{deal.product}</h2>
                  {this.renderStatus(deal.status)}
                </div>
                <p>
                  Supplier: <strong>{deal.supplier}</strong> ({deal.country})
                </p>
                <p>Price: ${deal.price} | Qty: {deal.quantity}</p>
                <p>Sent on: {deal.sentAt}</p>
                <div className="actions">
                  <button onClick={() => this.openDeal(deal)}>💬 View / Reply</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {showModal && selectedDeal && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Deal: {selectedDeal.product}</h2>
                <button className="close-btn" onClick={this.closeModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p>
                  Supplier: <strong>{selectedDeal.supplier}</strong> ({selectedDeal.country})
                </p>
                <p>Price: ${selectedDeal.price}</p>
                <p>Quantity: {selectedDeal.quantity}</p>
                <p>Status: {this.renderStatus(selectedDeal.status)}</p>
              </div>

              <div className="modal-footer">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => this.setState({ newMessage: e.target.value })}
                  placeholder="Type a message..."
                />
                <button onClick={this.handleSendMessage}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyDealsOutlet;
