import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          💰 Finance Tracker
        </Link>

        <div className="ms-auto">
          <Link
            to="/dashboard"
            className="btn btn-outline-light me-2"
          >
            Dashboard
          </Link>

          <Link
            to="/add"
            className="btn btn-success me-2"
          >
            Add Transaction
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}