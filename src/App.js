import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from "./Pages/NewSignup/Login"
import Verification from "./Pages/Verificationpage/Verification"
import Reset from "./Pages/Resetpage/Reset"
import Success from "./Pages/Successfulpage/Success"


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


function App() {
  return (
    <ThemeProvider>
      <GlobalStyles>
        <Router>
          <Routes>
            {/* Routes that include the Sidebar */}
            <Route path="/" element={<Signup />} />
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
            <Route path="/application" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/verify_otp" element={<ForgotEmailVerify />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/success" element={<Success />} />
            <Route path="/support_tickets" element={<Reports />} />
            <Route path="/faqs" element={<FrequentQuestion />} />
            <Route path="/my_account" element={<MyAccount />} />
          </Routes>
        </Router>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
