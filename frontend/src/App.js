import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<p>Signup</p>} />
          <Route path="/catalog" element={<p>Catalog</p>} />
          
          <Route path="/wizard/1" element={<p>Wizard Start</p>} />

          <Route path="*" element={<p>404 Not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
