import React from 'react';

const Sidebar = ({ role, children }) => {
  let links;
  // Dynamic links based on user role (placeholder for future Auth context)
  if (role === 'admin') {
    links = (
      <>
        <a href="/admin/dashboard" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Admin Dashboard</a>
        <a href="/admin/courses" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Manage Courses</a>
        <a href="/admin/users" className="p-2 rounded hover:bg-indigo-200 transition text-indigo-700">Manage Users</a>
      </>
    );
  } else if (role === 'student') {
    links = (
      <>
        <a href="/student/dashboard" className="p-2 rounded hover:bg-blue-200 transition text-blue-700">My Dashboard</a>
        <a href="/student/courses" className="p-2 rounded hover:bg-blue-200 transition text-blue-700">My Courses</a>
        <a href="/student/profile" className="p-2 rounded hover:bg-blue-200 transition text-blue-700">Profile</a>
      </>
    );
  } else {
    // No role or logged out - sidebar remains hidden or non-existent
    return null;
  }

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