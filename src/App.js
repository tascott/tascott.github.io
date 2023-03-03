import React from "react";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
