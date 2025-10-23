"use client";
import React, { useState } from 'react';

// Import components from the previously built folders
import Button from '../global/button';
import InputField from '../global/input-field';
import Card from '../global/card'; 
import Navbar from '../layout/navbar'; 

const SignInPage = () => {
  // Use state only for visual management (static, no actual auth logic here)
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
        setError('Please enter both email and password.');
        return;
    }

    // --- STATIC PLACEHOLDER LOGIC ---
    setIsLoading(true);
    console.log('Static Sign In Attempt:', form);
    
    // Simulate network delay and failure for static visual demo
    setTimeout(() => {
        setIsLoading(false);
        // Display a simulated error
        setError('Static simulation: Invalid credentials. (No real backend connection)');
    }, 1500);
    // --------------------------------

  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar>
        {/* Placeholder for Navbar content like a link to Home */}
        <a href="/" className="text-white hover:text-gray-200 transition">Home</a>
      </Navbar>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In to LMS</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded" role="alert">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g., student@lms.edu"
              disabled={isLoading}
              required
            />
            
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
            
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-4" 
            >
              {isLoading ? 'Processing...' : 'Sign In'}
            </Button>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium underline">
                Sign Up
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;