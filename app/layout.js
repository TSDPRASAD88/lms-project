// Note: Assuming connectToDatabase is in '@/utils/mongodb'
import './globals.css';
import connectToDatabase from '@/utils/mongodb'; 
import User from '@/app/models/User'; // Import the newly created User model

// NOTE: You must use 'async' on RootLayout when awaiting database calls.
export default async function RootLayout({ children }) {
  try {
    await connectToDatabase();
    
    // Log the success of the model load (required screenshot output)
    console.log('✅ User model loaded successfully:', !!User);

  } catch (err) {
    console.error('❌ Database connection or model load failed:', err.message);
  }

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}