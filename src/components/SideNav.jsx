// src/components/SideNav.jsx
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Rensar token & user
    navigate('/login');    // Redirect till login
  };

  return (
    <nav style={styles.nav}>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    width: '200px',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
