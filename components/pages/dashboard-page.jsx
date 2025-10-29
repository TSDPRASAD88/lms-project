"use client";
import React from 'react';

// Import reusable components using the stable @/ alias
import MainLayout from '@/components/layout/MainLayout.jsx';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/global/card';

const DashboardPage = () => {
  // Static placeholder data for dashboard cards
  const summaryCards = [
    { title: "Total Users", value: "450", icon: "👤", color: "indigo" },
    { title: "Active Courses", value: "12", icon: "📚", color: "blue" },
    { title: "Pending Reviews", value: "7", icon: "⭐", color: "yellow" },
    { title: "Revenue", value: "$14.5k", icon: "💰", color: "green" },
  ];

  // Pass role="admin" to the Sidebar component
  return (
    <MainLayout 
      sidebar={<Sidebar role="admin" />} 
      navbar={
        <Navbar>
          {/* Admin Navbar elements */}
          <a href="/signin" className="text-white hover:text-gray-200 transition">Logout</a>
        </Navbar>
      }
    >
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Admin Dashboard Overview</h1>
      
      {/* 1. Summary Cards Section (Responsive Grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryCards.map((item, index) => (
          <Card key={index} className={`border-l-4 border-${item.color}-500 hover:shadow-xl`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
              </div>
              <span className={`text-4xl text-${item.color}-500`}>{item.icon}</span>
            </div>
          </Card>
        ))}
      </section>

      {/* 2. Main Content Blocks (Responsive Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Management</h2>
            <p className="text-gray-600">
              This panel provides quick links for creating, editing, and archiving courses. 
            </p>
          </Card>
        </div>
s
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">System Status</h2>
            <div className="space-y-3">
                <p className="text-sm">Database: <span className="text-green-600 font-semibold">Online</span></p>
                <p className="text-sm">Last Backup: <span className="text-gray-600">2 hours ago</span></p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;