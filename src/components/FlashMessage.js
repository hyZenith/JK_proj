import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./FlashMessage.scss";

let flashMessageHandler = null;

const FlashMessageContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    flashMessageHandler = (type, message) => {
      const id = Date.now() + Math.random();
      setMessages((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, 5000); // disappear after 5s
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="flash-message-wrapper">
      {messages.map((msg) => (
        <div key={msg.id} className={`flash-message ${msg.type}`}>
          {msg.message}
        </div>
      ))}
    </div>,
    document.body
  );
};

export const FlashMessage = {
  show: (type, message) => {
    if (flashMessageHandler) {
      flashMessageHandler(type, message);
    } else {
      console.warn("FlashMessage not initialized yet.");
    }
  },
};

export default FlashMessageContainer;
