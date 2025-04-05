import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Job from "./pages/Job/Job";
import Login from "./pages/Login/Login";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <Router>
      {user ? (
        <Routes>
          <Route exact path="/" element={<Home setUser={setUser} />} />
          <Route path="/about" element={<About setUser={setUser} />} />
          <Route path="/jobs" element={<Job setUser={setUser} />} />
          <Route path="/contact" element={<Contact setUser={setUser} />} />
          <Route path="/gallery" element={<Gallery setUser={setUser} />} />
        </Routes>
      ) : (
        <Login setUser={setUser} />
      )}
    </Router>
  );
}

export default App;

