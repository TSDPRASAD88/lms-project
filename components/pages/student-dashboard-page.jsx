"use client";
import React from 'react'; // useEffect, useSession, and useRouter are no longer needed

// Imports related to manual authentication are removed:
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// Import reusable components using the stable @/ alias
import MainLayout from '@/components/layout/MainLayout';
import Sidebar from '@/components/Layout/Sidebar';
import Navbar from '@/components/Layout/Navbar';
import Card from '@/components/global/card';

const StudentDashboardPage = () => {
  // const { data: session, status } = useSession(); // Removed
  // const router = useRouter(); // Removed

  // The entire useEffect hook with security checks is removed.

  // The client console log is removed: console.log('STUDENT SESSION LOGGED (Browser-side):', session?.user);

  // 1. The conditional loading/authentication block is removed.
  // The middleware guarantees an authorized user reaches this point.
  
  // Static placeholder data for student progress
  const courses = [
    { id: 1, title: "Introduction to Web", progress: "60%", lessons: 8 },
    { id: 2, title: "Database Basics (SQL)", progress: "10%", lessons: 3 },
    { id: 3, title: "Full-Stack Mastery", progress: "0%", lessons: 1 },
  ];

  // 2. Render the actual dashboard content
  return (
    <MainLayout 
      sidebar={<Sidebar role="student" />} 
      navbar={
        <Navbar>
          {/* Student Navbar links/logout */}
          <div className="flex space-x-4">
            <a href="/courses" className="text-white font-medium hover:text-gray-300 transition">Courses</a>
            <a href="/profile" className="text-white font-medium hover:text-gray-300 transition">Profile</a>
            <a href="/signin" className="text-white hover:text-gray-300 transition">Logout</a>
          </div>
        </Navbar>
      }
    >
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Welcome Back, Kalvian! 🚀</h1>
      
      {/* 1. Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-indigo-50 border-indigo-300 border">
          <p className="text-sm font-medium text-indigo-700">Total Courses Enrolled</p>
          <p className="text-3xl font-bold text-indigo-900 mt-1">{courses.length}</p>
        </Card>
        <Card className="bg-green-50 border-green-300 border">
          <p className="text-sm font-medium text-green-700">Overall Progress</p>
          <p className="text-3xl font-bold text-green-900 mt-1">35%</p>
        </Card>
        <Card className="bg-yellow-50 border-yellow-300 border">
          <p className="text-sm font-medium text-yellow-700">Upcoming Lessons</p>
          <p className="text-3xl font-bold text-yellow-900 mt-1">2</p>
        </Card>
      </section>

      {/* 2. Enrolled Courses List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Enrolled Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Card key={course.id}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{course.lessons} Total Lessons</p>
              
              <div className="h-2 bg-gray-200 rounded-full mb-2">
                <div 
                  style={{ width: course.progress }} 
                  className="h-2 bg-indigo-600 rounded-full"
                ></div>
              </div>
              <p className="text-right text-sm font-medium text-indigo-600">{course.progress} Complete</p>
              
              <a href={`/course/${course.id}`} className="mt-4 block text-center text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 py-2 rounded transition">
                Continue Learning
              </a>
            </Card>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentDashboardPage;