// Note: Assuming connectToDatabase is in '@/utils/mongodb'
import './globals.css';
import connectToDatabase from '@/utils/mongodb'; 
import User from '@/app/models/User'; 
import NextAuthProvider from '../components/auth/NextAuthProvider'; 
import { Toaster } from 'react-hot-toast'; // <-- CRITICAL: NEW IMPORT for toasts

// NOTE: You must use 'async' on RootLayout when awaiting database calls.
export default async function RootLayout({ children }) {
  try {
    // Database connection check (Server-side)
    await connectToDatabase();
    
    console.log('✅ User model loaded successfully:', !!User);

  } catch (err) {
    console.error('❌ Database connection or model load failed:', err.message);
  }

  return (
    <html lang="en">
      {/* <body> is wrapped by the Client Component NextAuthProvider */}
      <NextAuthProvider> 
        <body>
          {children}
          {/* CRITICAL: Add the Toaster component globally at the end of the body */}
          <Toaster 
            position="top-right" 
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 4000 },
              style: {
                // Ensure text is readable against the background
                color: '#fff',
                background: '#333', 
              },
            }}
          />
        </body>
      </NextAuthProvider>
    </html>
  );
}