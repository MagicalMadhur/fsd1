import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { login, register } from '../api';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'company' | 'jobseeker'>('company');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isRegistering) {
        response = await register(username, password, userType);
        setIsRegistering(false);
      } else {
        response = await login(username, password);
        localStorage.setItem('token', response.data.token);
        navigate(response.data.userType === 'company' ? '/company' : '/jobseeker');
      }
    } catch (error) {
      console.error('Authentication failed', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center flex items-center justify-center">
          <UserCircle2 className="mr-2" />
          {isRegistering ? 'Register' : 'Login'} to Your Account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">User Type</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="company"
                    checked={userType === 'company'}
                    onChange={() => setUserType('company')}
                  />
                  <span className="ml-2">Company</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="jobseeker"
                    checked={userType === 'jobseeker'}
                    onChange={() => setUserType('jobseeker')}
                  />
                  <span className="ml-2">Job Seeker</span>
                </label>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                {isRegistering ? 'Register' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;