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
import WizardTwo from './pages/wizard/wizardTwo';
import WizardThree from './pages/wizard/wizardThree';
import WizardFour from './pages/wizard/wizardFour';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/catalog" element={<Catalog />} />
          
          <Route path="/wizard/1" element={<WizardOne />} />
          <Route path="/wizard/2" element={<WizardTwo />} />
          <Route path="/wizard/3" element={<WizardThree />} />
          <Route path="/wizard/4" element={<WizardFour />} />
          
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