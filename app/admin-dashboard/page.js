// app/admin-dashboard/page.js

// Imports related to manual authentication are removed:
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';
// import { NEXT_AUTH } from '../api/auth/[...nextauth]/route'; 

// Import the Admin Dashboard component
import DashboardPage from "../../components/pages/dashboard-page"; 

// Next.js convention: No longer 'async' since we removed getServerSession
export default function AdminDashboardPage() {
  
  // The middleware ensures only an Admin reaches this point.
  // The terminal log is removed: console.log('ADMIN SESSION LOGGED (Server-side):', session.user);

  return <DashboardPage />;
}