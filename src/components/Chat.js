import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/Chat.css";

function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setNewMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setNewMessages(messages);
    });

    return () => unsubscribe();
  }, []);

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
      <div>
        {messages.map((message, id) => (
          <h1 key={id}>{message.text}</h1>
        ))}
      </div>
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
