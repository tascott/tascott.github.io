import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import projectslist from "./projectslist.json";
import ProjectsList from "./pages/ProjectsList";
import Project from "./pages/Project";
import { HashRouter as Router, Route, Routes, useParams } from "react-router-dom";

function GetProject() {
  const { slug } = useParams();
  const project = projectslist[slug];
  const { title, description } = project;
  return <Project title={title} description={description} />;
}

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="projects" element={<Projects />}>
            <Route path="/projects/" element={<ProjectsList />} />
            <Route path="/projects/:slug" element={<GetProject />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
