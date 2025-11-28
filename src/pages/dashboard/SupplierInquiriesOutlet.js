import React, { Component } from "react";
import "./SupplierInquiriesOutlet.scss";

export default class SupplierInquiriesOutlet extends Component {
  state = {
    inquiries: [
      {
        id: 1,
        buyerName: "John Doe",
        product: "Wireless Earbuds",
        quantity: 500,
        country: "USA",
        message: "Hello, I’m interested in 500 units. Can you give a price offer?",
        conversation: [
          { from: "buyer", text: "Hello, I’m interested in 500 units. Can you give a price offer?" },
          { from: "supplier", text: "Sure, the price is $25 per unit for 500 pieces." },
        ],
      },
      {
        id: 2,
        buyerName: "Amira Ali",
        product: "LED Light Bulbs",
        quantity: 2000,
        country: "UAE",
        message: "Do you ship internationally and what’s your MOQ?",
        conversation: [
          { from: "buyer", text: "Do you ship internationally and what’s your MOQ?" },
          { from: "supplier", text: "Yes, we ship worldwide. MOQ is 500 units." },
        ],
      },
      {
        id: 3,
        buyerName: "Carlos Mendes",
        product: "Bluetooth Speakers",
        quantity: 300,
        country: "Brazil",
        message: "Please provide shipping cost to Brazil.",
        conversation: [
          { from: "buyer", text: "Please provide shipping cost to Brazil." },
          { from: "supplier", text: "Estimated cost is around $120 for 300 units." },
        ],
      },
    ],
    selectedInquiry: null,
    replyText: "",
  };

  openConversation = (inquiry) => {
    this.setState({ selectedInquiry: inquiry, replyText: "" });
  };

  closeModal = () => {
    this.setState({ selectedInquiry: null });
  };

  handleReplyChange = (e) => {
    this.setState({ replyText: e.target.value });
  };

  sendMessage = () => {
    const { selectedInquiry, replyText } = this.state;
    if (!replyText.trim()) return;

    const updatedInquiry = {
      ...selectedInquiry,
      conversation: [
        ...selectedInquiry.conversation,
        { from: "supplier", text: replyText.trim() },
      ],
    };

    this.setState((prev) => ({
      inquiries: prev.inquiries.map((i) =>
        i.id === updatedInquiry.id ? updatedInquiry : i
      ),
      selectedInquiry: updatedInquiry,
      replyText: "",
    }));
  };

  render() {
    const { inquiries, selectedInquiry, replyText } = this.state;

    return (
      <div className="inquiries-page">
        <h1>Inquiries</h1>

        <div className="inquiries-list">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="inquiry-item"
              onClick={() => this.openConversation(inq)}
            >
              <div className="inquiry-header">
                <h2>{inq.product}</h2>
                <span className="country">{inq.country}</span>
              </div>
              <p className="buyer">
                From: <strong>{inq.buyerName}</strong>
              </p>
              <p className="preview">{inq.message}</p>
              <div className="meta">
                <span>Qty: {inq.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedInquiry && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="modal-header">
                <h2>
                  {selectedInquiry.product} – {selectedInquiry.buyerName}
                </h2>
                <button className="close-btn" onClick={this.closeModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {selectedInquiry.conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.from === "supplier" ? "me" : "buyer"}`}
                  >
                    <div className="text">{msg.text}</div>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={this.handleReplyChange}
                  onKeyDown={(e) => e.key === "Enter" && this.sendMessage()}
                />
                <button onClick={this.sendMessage}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
