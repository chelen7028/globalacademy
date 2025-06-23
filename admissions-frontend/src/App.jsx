import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Apply from './Apply';
import Admin from './Admin';
import ThankYou from './ThankYou';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
