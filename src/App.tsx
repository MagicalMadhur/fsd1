import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CompanyDashboard from './components/CompanyDashboard';
import JobSeekerDashboard from './components/JobSeekerDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;