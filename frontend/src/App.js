import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home/home';
import Catalog from './pages/catalog/catalog';
import Settings from './pages/settings/settings';
import PrivateRoutes from './components/privateRoutes/privateRoutes';
import RestrictedRoutes from './components/restrictedRoutes/restrictedRoutes';
import SignupPage from './pages/signup/signup';
import WizardOne from './pages/wizard/wizardOne';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/catalog" element={<Catalog />} />
          
          <Route path="/wizard/1" element={<WizardOne />} />
          
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<p>404 Not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;

//is it safe to store user ID in redux state