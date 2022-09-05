import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home/home';
import Catalog from './pages/catalog/catalog';
import PrivateRoutes from './components/privateRoutes/privateRoutes';
import RestrictedRoutes from './components/restrictedRoutes/restrictedRoutes';
import SignupPage from './pages/signup/signup';
import WizardOne from './pages/wizard/wizardOne';
import WizardTwo from './pages/wizard/wizardTwo';
import WizardThree from './pages/wizard/wizardThree';
import WizardFour from './pages/wizard/wizardFour';
import WizardFive from './pages/wizard/wizardFive';
import ServiceDetail from './pages/serviceDetail/serviceDetail';
import ConfirmationPage from './pages/wizard/confirmation';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wizard/1" element={<WizardOne />} />
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/wizard/2" element={<WizardTwo />} />
            <Route path="/wizard/3" element={<WizardThree />} />
            <Route path="/wizard/4" element={<WizardFour />} />
            <Route path="/wizard/5" element={<WizardFive />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/order" element={<ConfirmationPage />} />
          </Route>

          <Route path="*" element={<p>404 Not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;

//is it safe to store user ID in redux state