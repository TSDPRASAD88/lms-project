"use client"
import React from 'react';//

const Footer = () => (
  <footer className="w-full bg-gray-100 text-gray-600 text-center py-4 border-t border-gray-200">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} LMS Project. All rights reserved. Built with Next.js and Tailwind CSS.
    </p>
  </footer>
);

export default Footer;