import "./Chat.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchMessages, createMessage, deleteMessage } from "../../services/authService";
import SideNav from "../../components/SideNav";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  const conversationId = "550e8400-e29b-41d4-a716-446655440000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Kunde inte decoda token:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    loadMessages();
  }, [user]);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages(conversationId);
      if (!data || data.length === 0) {
        const gunillaMessages = [
          { id: "g1", userId: "gunilla", content: "Hej! Hur mår du?" },
          { id: "g2", userId: "gunilla", content: "Jag tycker vi borde ta en fika snart ☕" },
        ];
        setMessages(gunillaMessages);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error("Kunde inte hämta meddelanden:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const sanitized = newMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    try {
      const savedMessage = await createMessage(sanitized, conversationId);
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Kunde inte skicka meddelandet:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Kunde inte radera meddelandet:", error);
    }
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="chat-page" style={{ display: "flex" }}>
      <SideNav user={user} />
      <div className="chat-container" style={{ flex: 1 }}>
        <h2 className="chat-title">Chatt</h2>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${
                String(msg.userId) === String(user.id) ? "own-message" : "other-message"
              }`}
            >
              <span>
                {msg.userId === "gunilla" ? "Gunilla: " : ""}
                {msg.content}
              </span>
              {String(msg.userId) === String(user.id) && (
                <button className="delete-btn" onClick={() => handleDeleteMessage(msg.id)}>
                  &#10005;
                </button>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Skriv ett meddelande"
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn">
            Skicka
          </button>
        </form>
      </div>
    </div>
  );
}
