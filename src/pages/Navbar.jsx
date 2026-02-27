import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Navbar.css"

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/"); 
  };

  return (
  <nav className="navbar">
    <Link to="/" className="logo">MyBlog</Link>



  <div className="account-container">
      <a
      href="https://frontendadminblogapp.netlify.app/"
      className="admin-link"
      target="_blank"
      rel="noopener noreferrer"> Admin Dashboard </a>

    <button className="account-btn" onClick={() => setOpen(!open)}> 
      {/* toggle the button from open to close */}
      {username ? username : "Account"}
    </button>

    {open && (
      <div className="dropdown">
        {!token ? (
          <>
            <Link to="/login" className="dropdown-link">Login</Link>
            <Link to="/register" className="dropdown-link">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    )}
  </div>
</nav>
  );
}

export default Navbar;