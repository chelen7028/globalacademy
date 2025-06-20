import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apply from './Apply';
import Admin from './Admin';
import ThankYou from './ThankYou';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;

