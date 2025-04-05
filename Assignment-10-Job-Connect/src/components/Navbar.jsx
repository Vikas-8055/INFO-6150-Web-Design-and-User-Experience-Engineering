import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  console.log("Navbar user:", user);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      <Link to="/gallery" className="nav-link">Gallery</Link>
      {user?.type === "admin" && (
        <>
          <Link to="/admin/employees" className="nav-link">Employees</Link>
          <Link to="/admin/add-jobs" className="nav-link">Add Jobs</Link>
        </>
      )}
      {user?.type === "employee" && (
        <Link to="/employee/jobs" className="nav-link">Jobs</Link>
      )}
      {!user ? (
        <Link to="/login" className="nav-link">Login</Link>
      ) : (
        <button onClick={handleLogout} className="nav-button">Logout</button>
      )}
    </nav>
  );
};

export default Navbar;