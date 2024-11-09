import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
// import Register from "./src/pages/Register";
import Contact from "./src/pages/Contact";
import AddProduct from "./src/pages/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/add-product" element={<AddProduct />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
