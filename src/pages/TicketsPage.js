import React, { Component } from "react";
import "./TicketsPage.scss";

class TicketsPage extends Component {
  state = {
    tickets: [],
    selectedTicket: null,
    showCreateModal: false,
    newTicketSubject: "",
    newTicketMessage: "",
    replyText: "",
    loading: true,
  };

  componentDidMount() {
    this.fetchTickets();
  }

  // Simulated API call
  fetchTickets = async () => {
    this.setState({ loading: true });
    const fakeData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            subject: "Issue with payment",
            status: "open",
            createdAt: "2025-10-01",
            messages: [
              { from: "user", text: "My payment failed during checkout." },
              { from: "support", text: "We’re checking the issue, please hold on." },
            ],
          },
          {
            id: 2,
            subject: "Bug in product page",
            status: "pending",
            createdAt: "2025-10-02",
            messages: [
              { from: "user", text: "Product images are not loading." },
              { from: "support", text: "We’ve reported this to our dev team." },
            ],
          },
          {
            id: 3,
            subject: "Feature request",
            status: "closed",
            createdAt: "2025-09-28",
            messages: [
              { from: "user", text: "Can you add a dark mode to dashboard?" },
              { from: "support", text: "Dark mode is planned for next release!" },
            ],
          },
        ]);
      }, 1000);
    });
    this.setState({ tickets: fakeData, loading: false });
  };

  // Open ticket chat
  openTicket = (ticket) => {
    this.setState({ selectedTicket: ticket, replyText: "" });
  };

  closeTicketModal = () => {
    this.setState({ selectedTicket: null });
  };

  // Create new ticket modal
  openCreateModal = () => {
    this.setState({ showCreateModal: true, newTicketSubject: "", newTicketMessage: "" });
  };

  closeCreateModal = () => {
    this.setState({ showCreateModal: false });
  };

  handleCreateTicket = () => {
    const { newTicketSubject, newTicketMessage, tickets } = this.state;
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    const newTicket = {
      id: Date.now(),
      subject: newTicketSubject,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      messages: [{ from: "user", text: newTicketMessage }],
    };

    this.setState({
      tickets: [newTicket, ...tickets],
      showCreateModal: false,
    });
  };

  // Send reply message
  handleSendMessage = () => {
    const { selectedTicket, replyText } = this.state;
    if (!replyText.trim()) return;

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, { from: "user", text: replyText.trim() }],
    };

    this.setState((prev) => ({
      tickets: prev.tickets.map((t) =>
        t.id === updatedTicket.id ? updatedTicket : t
      ),
      selectedTicket: updatedTicket,
      replyText: "",
    }));
  };

  renderStatus(status) {
    return <span className={`status ${status}`}>{status}</span>;
  }

  render() {
    const {
      tickets,
      selectedTicket,
      showCreateModal,
      loading,
      newTicketSubject,
      newTicketMessage,
      replyText,
    } = this.state;

    return (
      <div className="tickets-page">
        <div className="page-header">
          <h1>Support Tickets</h1>
          <button className="new-ticket-btn" onClick={this.openCreateModal}>
            + New Ticket
          </button>
        </div>

        {loading ? (
          <p className="loading">Loading tickets...</p>
        ) : (
          <div className="tickets-list">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="ticket-card"
                onClick={() => this.openTicket(ticket)}
              >
                <div className="ticket-top">
                  <h2>{ticket.subject}</h2>
                  {this.renderStatus(ticket.status)}
                </div>
                <p className="created-at">Created: {ticket.createdAt}</p>
              </div>
            ))}
            {tickets.length === 0 && (
              <p className="no-tickets">No tickets available.</p>
            )}
          </div>
        )}

        {/* CREATE TICKET MODAL */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={this.closeCreateModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create New Ticket</h2>
                <button className="close-btn" onClick={this.closeCreateModal}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Subject"
                  value={newTicketSubject}
                  onChange={(e) => this.setState({ newTicketSubject: e.target.value })}
                />
                <textarea
                  placeholder="Describe your issue..."
                  value={newTicketMessage}
                  onChange={(e) => this.setState({ newTicketMessage: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button onClick={this.handleCreateTicket}>Submit Ticket</button>
              </div>
            </div>
          </div>
        )}

        {/* TICKET CHAT MODAL */}
        {selectedTicket && (
          <div className="modal-overlay" onClick={this.closeTicketModal}>
            <div
              className="modal chat"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{selectedTicket.subject}</h2>
                <button className="close-btn" onClick={this.closeTicketModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body chat-body">
                {selectedTicket.messages.map((msg, i) => (
                  <div key={i} className={`message ${msg.from}`}>
                    <div className="bubble">{msg.text}</div>
                  </div>
                ))}
              </div>

              <div className="modal-footer chat-footer">
                <input
                  type="text"
                  placeholder="Type a reply..."
                  value={replyText}
                  onChange={(e) => this.setState({ replyText: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && this.handleSendMessage()}
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

export default TicketsPage;
