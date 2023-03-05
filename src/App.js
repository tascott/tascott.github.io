import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import ProjectsList from "./pages/ProjectsList";
import Project from "./pages/ProjectPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="projects" element={<Projects />}>
          <Route path="/projects/" element={<ProjectsList />} />
          <Route path="/projects/:slug" element={<Project />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
