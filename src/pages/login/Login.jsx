
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCsrfToken } from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        setError("Kunde inte hämta CSRF-token");
      }
    };
    fetchToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser({ username, password, csrfToken });
      navigate("/chat");
    } catch (err) {
      setError(err.message || "Felaktigt användarnamn eller lösenord");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Logga in</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
