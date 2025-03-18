import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard"
import Login from "./Pages/Login/Login"
import Forgotpassword from "./Pages/Passwordpage/Forgotpassword"
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


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that include the Sidebar */}
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/request"
          element={ <Request />
          }
        />
        <Route
          path="/budget-performance"
          element={
            <Layout>
              <Budget />
            </Layout>
          }
        />
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
        <Route path="/account" element={<Account />} />
        <Route path="/application" element={<Application />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
