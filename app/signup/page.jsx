// app/signup/page.jsx

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast'; // <--- THIS LINE IS MISSING OR BROKEN!
// Use the absolute @/ alias to resolve paths from the project root
import Navbar from '@/components/layoute/nNavbar';
import InputField from '@/components/global/input-field'; 
import Button from '@/components/global/button'; 
import Card from '@/components/global/card';

const SignupPage = () => {
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    role: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password || !form.name) {
      toast.error('All fields are required.'); // <-- TOAST VALIDATION
      return;
    }
    
    setIsLoading(true);
    
    // Toast 1: Registration loading
    const loadingToast = toast.loading('Creating your account...', {
      duration: Infinity,
    });
    
    try {
      // 1. CALL REGISTRATION API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.dismiss(loadingToast);
        toast.error(data.error || 'Registration failed. Please try again.'); // <-- TOAST REGISTRATION FAILURE
        return;
      }

      toast.dismiss(loadingToast);
      
      // Toast 2: Login loading
      const loginToast = toast.loading('Registration successful! Logging you in...', {
        duration: Infinity,
      });

      // 2. AUTO SIGN-IN using credentials
      const signInResponse = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (signInResponse?.ok) {
        toast.dismiss(loginToast);
        toast.success(`Welcome ${form.name}! Redirecting to your dashboard...`); // <-- TOAST FINAL SUCCESS
        
        // 3. ROLE-BASED REDIRECT
        const dashboardPath = form.role === 'admin' ? '/admin-dashboard' : '/student-dashboard';
        router.replace(dashboardPath);
      } else {
        toast.dismiss(loginToast);
        toast.error('Registration succeeded, but automatic login failed. Please sign in manually.'); // <-- TOAST LOGIN FAILURE
      }

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('An unexpected error occurred. Please try again.');
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
          
          {/* Removed local error/success displays */}
          
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
              <button
                type="button"
                onClick={() => router.push('/signin')}
                className="text-indigo-600 hover:text-indigo-800 underline font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;