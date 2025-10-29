// app/page.js
import React from 'react';

// Import layout and global components using the absolute @/ alias
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';
import Button from '@/components/global/button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Navbar */}
      <Navbar>
        {/* Links to the authentication pages */}
        <div className="flex space-x-4">
          <a href="/signin" className="text-white hover:text-gray-200 transition font-medium">Sign In</a>
          <Button className="bg-white text-indigo-700 hover:bg-gray-100 py-1 px-3">
            <a href="/signup">Sign Up</a>
          </Button>
        </div>
      </Navbar>

      {/* 2. Main Content / Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Welcome to the LMS Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Enroll in courses, track your progress, and manage your learning journey.
          </p>
          
          <div className="space-x-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <a href="/signup">Get Started</a>
            </Button>
            <a href="/signin" className="text-indigo-600 font-semibold hover:underline px-4 py-2 transition">
              Already a User? →
            </a>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}