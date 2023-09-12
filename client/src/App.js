import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/team-select" element={<Booking />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
