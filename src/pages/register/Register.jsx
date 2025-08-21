import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, getCsrfToken } from "../../services/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken.");
      return;
    }
    console.log({
      username,
      email,
      password,
      csrfToken,
      avatar: "https://i.pravatar.cc/200",
    });
    try {
      await registerUser({
        username,
        email,
        password,
        csrfToken,
        avatar: "https://i.pravatar.cc/200", 
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Något gick fel");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Registrera dig</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>
          Registrering lyckades! Du skickas till login...
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}
