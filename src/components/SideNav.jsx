import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

export default function SideNav({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();  
    navigate("/login");  
  };

  return (
    <div style={{
      width: "220px",
      backgroundColor: "#f4f4f4",
      padding: "20px",
      borderRight: "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <img
        src={user.avatar} 
        alt="User avatar"
        style={{ width: "80px", borderRadius: "50%", marginBottom: "10px" }}
      />
      <p>{user.user}</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "tomato",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logga ut
      </button>
    </div>
  );
}
