import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth/next';
import connectToDatabase from '@/utils/mongodb'; 
import User from '@/app/models/User';   
import bcrypt from 'bcryptjs';

// Define the auth options object
const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required"); 
        }

        try {
          // Connect to DB before finding the user
          await connectToDatabase();
        } catch (err) {
          console.error('MongoDB connection error in NextAuth:', err);
          throw new Error('Database connection failed');
        }

        // --- Use the imported User model ---
        const user = await User.findOne({ email: credentials.email }).lean();

        if (!user) {
          console.log('Login failed: Invalid email:', credentials.email);
          return null; 
        }

        // --- CORE SECURITY: Compare HASHED password ---
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          console.log('Login failed: Invalid password for email:', credentials.email);
          return null; 
        }
        
        console.log('Login successful for user:', user.email);

        // Return user object for JWT serialization
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  
  // Ensure this is set in .env.local
  secret: process.env.NEXTAUTH_SECRET, 
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    // Add user data (name, role) to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    // Add data from the token back to the session object
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.id = token.sub; // sub is the user ID
        session.user.role = token.role;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/signin',
  },
};

// NextAuth handler for API routes
const handler = NextAuth(NEXT_AUTH);

// Export both the handler (for GET/POST API calls) AND the NEXT_AUTH object 
// (for getServerSession() in TSDP 8.20).
export { handler as GET, handler as POST, NEXT_AUTH };