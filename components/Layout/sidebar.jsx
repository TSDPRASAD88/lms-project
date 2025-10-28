"use client"; // CRITICAL: MUST BE A CLIENT COMPONENT TO USE signOut() and hooks

import React from 'react';
import { signOut } from 'next-auth/react'; 
import toast from 'react-hot-toast';    

const Sidebar = ({ role, children }) => {
  
  // Logout Handler Function
  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading('Logging out...', {
        duration: Infinity,
      });
      
      // Clear the session and redirect to the signin page
      await signOut({ callbackUrl: '/signin' }); 
      
      toast.dismiss(loadingToast);
      toast.success('You have been logged out.');

    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };

  let links;

  // --- Dynamic links based on user role ---
  if (role === 'admin') {
    links = (
      <>
        {/* Admin Links */}
        <a href="/admin-dashboard" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Admin Dashboard</a>
        <a href="/admin/courses" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Manage Courses</a>
        <a href="/admin/users" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Manage Users</a>
        
        {/* LOGOUT BUTTON FOR ADMIN */}
        <button
          onClick={handleLogout}
          className="p-2 text-left rounded hover:bg-red-100 transition text-red-700 font-semibold mt-2"
        >
          Logout
        </button>
      </>
    );
  } else if (role === 'student') {
    links = (
      <>
        {/* Student Links */}
        <a href="/student-dashboard" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">My Dashboard</a>
        <a href="/courses" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">My Courses</a>
        <a href="/grades" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Grades</a>
        <a href="/profile" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Profile</a>
        
        {/* LOGOUT BUTTON FOR STUDENT */}
        <button
          onClick={handleLogout}
          className="p-2 text-left rounded hover:bg-red-100 transition text-red-700 font-semibold mt-2"
        >
          Logout
        </button>
      </>
    );
  } else {
    // No role or logged out - sidebar remains hidden or non-existent
    return null;
  }

  if (!links) return null;

  return (
    // Responsive sidebar: hidden on small screens, block on medium screens and up
    <aside className="w-64 bg-gray-50 h-full p-4 hidden md:block border-r border-gray-200">
      <nav className="flex flex-col gap-2 font-medium">
        {links}
        {/* Placeholder for any extra sidebar content */}
        {children}
      </nav>
    </aside>
  );
};

export default Sidebar;