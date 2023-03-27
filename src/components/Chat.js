import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/Chat.css";

function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");

  const messageRef = collection(db, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />

        <button className="sent-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
