import './App.css';
import React from 'react';
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
import ServiceDetailNoPricing from './pages/serviceDetail/serviceDetailNoPricing';
import Nav from './components/nav/nav';
import { useDispatch } from 'react-redux';
import { closeNav } from './features/wizardSlice';
import { useSelector } from 'react-redux';
import { selectShowNav } from './features/wizardSlice';
import PrivacyPolicy from './pages/legal/privacyPolicy';
import Terms from './pages/legal/terms';
import FinishSetupPage from './pages/signup/finishSetupPage';

function App() {
  const dispatch = useDispatch();
  const showNav = useSelector(selectShowNav);

  const handleMenuClickOff = () => {
    dispatch(closeNav())
  }

  return (
    <Router>
      <Nav
        homeNav="store"
        showSolution={true}
        showServices={true}
        showAccountSettings={true}
      />
      <div onClick={showNav ? () => handleMenuClickOff() : null}>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/service/general/:serviceId" element={<ServiceDetailNoPricing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wizard/1" element={<WizardOne />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/google/account-setup" element={<FinishSetupPage />} />
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/wizard/2" element={<WizardTwo />} />
            <Route path="/wizard/3" element={<WizardThree />} />
            <Route path="/wizard/4" element={<WizardFour />} />
            <Route path="/wizard/5" element={<WizardFive />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Route>

          <Route path="*" element={<p>404 Not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;