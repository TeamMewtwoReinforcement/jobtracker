import React, { useEffect, useState } from 'react';
import '../../client/styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header.tsx';
import JobList from './JobList.tsx';
import BarChart from './BarChart.js';
import DashboardPage from './DashboardPage.tsx'
import LoginForm from './Login.tsx';
import SignUpForm from './SignUp.tsx';

//By using React.FC, TypeScript automatically infers the type of the component’s props. Do we want to do that?
//Probaby not, but just did it for set up
const App: React.FC = () => {

  return (
    <Router>
     <Header />
     <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/job-list" element={<JobList />} />
      {/* <Route path="/contacts" element={<tbd />} /> */}
      <Route path="/login" element={<LoginForm/>} />
      <Route path="signup" element={<SignUpForm/>} />
     </Routes>
    </Router>
  )
};

export default App;