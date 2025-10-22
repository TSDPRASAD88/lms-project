// app/dashboard/page.js
import React from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import CourseCard from '../../components/Course/CourseCard';

// This is a Page component, marked for client use if using hooks, 
// but for a pure skeleton, it can remain a Server Component by default.

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder skeleton elements */}
        <CourseCard title="Introduction to Web" progress="60%" />
        <CourseCard title="Database Basics" progress="10%" />
        <CourseCard title="Full-Stack Mastery" progress="0%" />
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Lessons</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Skeleton content for upcoming lessons */}
          <p className="text-gray-500">Lesson list skeleton goes here...</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;