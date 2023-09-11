import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Who from "./pages/Who";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/team-select" element={<Who />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
