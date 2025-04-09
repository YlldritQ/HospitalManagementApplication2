'use client';

import { useState } from 'react';

interface LoginDto {
  email: string;
  password: string;
}

export default function TestPage() {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrorDetails('');

    try {
      console.log('Sending login request to:', 'http://localhost:5000/api/auth/login');
      console.log('Request body:', JSON.stringify(formData));

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setMessage('Login successful! Token: ' + data.token);
        localStorage.setItem('token', data.token);
      } else {
        setMessage('Login failed');
        setErrorDetails(`Status: ${response.status} - ${data.message || 'No error message provided'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login');
      if (error instanceof Error) {
        setErrorDetails(error.message);
      } else {
        setErrorDetails('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center">Login Test</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-md ${message.includes('successful') ? 'bg-green-900' : 'bg-red-900'}`}>
            <p className="font-bold">{message}</p>
            {errorDetails && (
              <p className="mt-2 text-sm opacity-75">{errorDetails}</p>
            )}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-400">
          <p>Test credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: Admin@123</p>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>API Endpoint:</p>
          <p className="break-all">http://localhost:5000/api/auth/login</p>
        </div>
      </div>
    </main>
  );
}
  