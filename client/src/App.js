import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";
import Staff from "./pages/Staff";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
