"use client"
import React from 'react';//

const Navbar = ({ children }) => (
  <nav className="w-full bg-indigo-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
    <div className="font-extrabold text-xl tracking-wider">
      LMS Platform
    </div>

    {/* The 'children' prop is used to inject dynamic content like links or auth buttons */}
    <div className="flex items-center space-x-4">
      {children}
    </div>
  </nav>
);

export default Navbar;