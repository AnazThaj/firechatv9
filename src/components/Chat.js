import React, { useState } from "react";

function Chat() {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className="sent-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
