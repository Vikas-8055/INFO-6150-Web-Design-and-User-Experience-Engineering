import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3010/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        alert(`Welcome back, ${user.fullName} (${user.type})`);
        navigate("/"); 
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      if (error.response && error.response.status === 401) {
        alert("Invalid Credentials");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="sub_container">
        <h1 className="header">Log In to CareerPrep</h1>
        <form className="form_container" onSubmit={loginUser}>
          <input
            placeholder="Email"
            className="input_container"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="input_container"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;