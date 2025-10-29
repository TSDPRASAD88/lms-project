"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; 
import toast from 'react-hot-toast'; // <-- NEW IMPORT

// Import components using the absolute @/ alias
import Button from '@/components/global/button'; // <-- FIXED
import InputField from '@/components/global/input-field'; // <-- FIXED
import Card from '@/components/global/card'; // <-- FIXED
import Navbar from '@/components/layout/navbar'; // <-- FIXED

const SignInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      toast.error('Email and password are required.'); // <-- TOAST VALIDATION
      return;
    }

    setIsLoading(true);
    
    // Show persistent loading toast
    const loadingToast = toast.loading('Signing you in...', {
      duration: Infinity,
    });

    try {
      // --- NEXTAUTH LOGIN LOGIC ---
      const res = await signIn("credentials", { 
        redirect: false,
        email: form.email,
        password: form.password
      });
      
      if (res?.error) {
        toast.dismiss(loadingToast);
        toast.error("Invalid credentials. Please check your email and password."); // <-- TOAST ERROR
        return;
      }
      
      if (res?.ok) {
        toast.dismiss(loadingToast);
        toast.success('Login successful! Redirecting...'); // <-- TOAST SUCCESS
        
        // Fetch session data to determine role for accurate redirection
        setTimeout(async () => {
          const sessionRes = await fetch('/api/auth/session');
          const session = await sessionRes.json();
          const role = session?.user?.role;
          
          if (role === 'admin') {
            router.push('/admin-dashboard');
          } else if (role === 'student') {
            router.push('/student-dashboard');
          } else {
            console.log("Login successful, but role is undefined:", session);
            router.push('/'); // Fallback
          }
        }, 100);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred. Please try again."); // <-- TOAST CATCH
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar>
        <a href="/" className="text-white hover:text-gray-200 transition">Home</a>
      </Navbar>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In to LMS</h2>
          
          {/* Removed local error display: {error && (...)} */}
          
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