"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import reusable components
import Navbar from '../../components/layout/navbar';
import InputField from '../../components/global/input-field';
import Button from '../../components/global/button';
import Card from '../../components/global/card'; // Added Card for structure

const SignupPage = () => {
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Client-side quick check
    if (!form.email || !form.password || !form.name) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from the API route (status 400)
        setError(data.error || 'Registration failed');
        return;
      }

      // Successful registration
      setSuccess('Registration successful! Redirecting to login...');
      setForm({ email: '', password: '', name: '', role: 'student' }); // Clear form

      // Redirect to login page after 2 seconds (as per sample)
      setTimeout(() => {
        router.push('/signin');
      }, 2000);

    } catch (err) {
      // Handle network errors
      setError('An unexpected network error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar>
        <a href="/signin" className="text-white hover:text-gray-200 transition font-medium">Sign In</a>
      </Navbar>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded" role="alert">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isLoading}
              required
            />
            
            {/* Email Input */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
            
            {/* Password Input */}
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password (min 6 characters)"
              disabled={isLoading}
              required
            />
            
            {/* Role Selection */}
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm text-gray-700 font-medium mb-1">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 border-gray-300"
                disabled={isLoading}
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-indigo-600 hover:text-indigo-800 underline font-medium">
                Sign In
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;