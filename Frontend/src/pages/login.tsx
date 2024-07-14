import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      }, { withCredentials: true });

      if (response.status === 401) {
        setError('Invalid credentials');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <section className="bg-blue-600 min-h-screen py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold leading-tight text-blue-600 mb-6">
          Sign in to your account
        </h1>
        {error && <h5 className="text-red-600 text-center mb-4">{error}</h5>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-600">Remember me</label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet? <Link to='/signup' className="font-medium text-blue-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
