import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from "./Pages/NewSignup/Login"
import Verification from "./Pages/Verificationpage/Verification"
import Reset from "./Pages/Resetpage/Reset"
import Success from "./Pages/Successfulpage/Success"
import Welly from "./Pages/Welly/Welly"
import Fill from "./Pages/Fill/Fill"
import Process from "./Pages/Process/Process"


import Layout from "./Components/Layout";

// import Signup from "./Pages/Signup/Signup";
import Signup from "./Pages/NewSignup/Signup";
import Create from "./Pages/Create/Create";
import Request from "./Pages/Request/Request";
import Budget from "./Pages/Budget/BudgetPerformance";
import Settings from "./Pages/Settings/Profilesettings";
import Account from "./Pages/Account/Account";
import Application from "./Pages/Application/Application";
import Welcome from "./Pages/NewSignup/Welcome";
import ForgotPassword from "./Pages/NewSignup/ForgotPassword";
import ForgotEmailVerify from "./Pages/NewSignup/ForgotEmailVerify";
import { ThemeProvider } from './ThemeContext.js';
import GlobalStyles from './GlobalStyles.js';
import Reports from "./Pages/New Reports/Reports.js";
import FrequentQuestion from "./Pages/FAQs/FrequentQuestion.js";
import MyAccount from "./Pages/My Account/MyAccount.js";
import Settingss from "./Pages/New Settings/Settingss.js";
import AllApplications from "./Pages/All Applications/AllApplications.js";
import Allinvoices from "./Pages/All Invoices/Allinvoices.js";
import AllPayment from "./Pages/All Payments/AllPayment.js";
import NewApplications from "./Pages/New Applicationss/NewApplications.js";
import LandRatificationApp from "./Pages/New Applicationss/LandRatificationApplication.js";
import OnboardingCompleteReg from "./Pages/NewSignup/OnboardingCompleteReg.js";
import FinishOnboarding from "./Pages/Finish Onboarding/FinishOnboarding.js";
import NewNinVerification from "./Pages/NewSignup/NewNinVerification.js";
import OnboardingStin from "./Pages/NewSignup/OnboardingStin.js";
import CompletedSuccess from "./Pages/NewSignup/CompletedSuccess.js";
import NewCacCompleteReg from "./Pages/CAC Complete Reg/NewCacCompleteReg.js";
import ApplicationPage from "./Pages/ApplicationPage/Application.js";


function App() {
  return (
    <ThemeProvider>
      <GlobalStyles>
        <Router>
          <Routes>
            {/* Routes that include the Sidebar */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/request" element={ <Request /> } />
            <Route path="/budget-performance" element={ <Layout> <Budget /> </Layout> }  />
            <Route
              path="/profile-settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />

            {/* Routes without Sidebar (Login, Signup, Account) */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/account" element={<Account />} />
            <Route path="/complete_your_registration" element={<OnboardingCompleteReg />} />
            <Route path="/finish_onboarding_process" element={<FinishOnboarding />} />
            <Route path="/nin_verificaation" element={<NewNinVerification />} />
            <Route path="/complete_your_registration_stin" element={<OnboardingStin />} />
            <Route path="/completed_registration_successful" element={<CompletedSuccess />} />
            <Route path="/complete_your_registration_cac" element={<NewCacCompleteReg />} />
            <Route path="/application" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/verify_otp" element={<ForgotEmailVerify />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/success" element={<Success />} />
            <Route path='/settings' element={<Settingss />} />
            <Route path='/applications' element={<AllApplications />} />
            <Route path="/support_tickets" element={<Reports />} />
            <Route path="/faqs" element={<FrequentQuestion />} />
            <Route path="/my_account" element={<MyAccount />} />
            <Route path="/invoices" element={<Allinvoices />} />
            <Route path="/payments" element={<AllPayment />} />
            <Route path='/new_applications' element={<NewApplications />} />
            <Route path='/applications_building_permit' element={<LandRatificationApp />} />
            <Route path='/application_page' element={<ApplicationPage />} />

            <Route path="/Welly" element={<Welly/>} />
        <Route path="/Fill" element={<Fill />} />
        <Route path="/Process" element={<Process/>} />
          </Routes>
        </Router>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
