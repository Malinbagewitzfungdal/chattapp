
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Välkommen till Chatify</h1>
      <p>Välj ett alternativ:</p>
      <button onClick={() => navigate("/login")} style={{ marginRight: "10px" }}>
        Logga in
      </button>
      <button onClick={() => navigate("/register")}>
        Registrera dig
      </button>
    </div>
  );
}
