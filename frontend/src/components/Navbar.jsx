import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Smart Complaint System</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-complaint">Register</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/status-update">Status Update</Link>
        <Link to="/ai-analysis">AI Analysis</Link>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;