import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
// import Register from "./src/pages/Register";
import Dashboard from "./src/pages/Dashboard";
import Contact from "./src/pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
