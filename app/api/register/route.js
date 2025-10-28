import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // --- 1. Basic Input Validation (Unchanged) ---
    if (!email || !password || !name || !role) {
      console.log(' Registration failed: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!['student', 'admin'].includes(role)) {
      console.log(' Registration failed: Invalid role -', role);
      return NextResponse.json(
        { error: 'Invalid role selected' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(' Registration failed: Invalid email format -', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log(' Registration failed: Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // --- 2. Database Connection and Duplicate Check (Unchanged) ---
    await connectToDatabase(); 
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(' Registration failed: Email already exists -', email);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // --- 3. Hash Password and Create User (Unchanged) ---
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
    });
    
    // --- 4. Dynamic Success Response (UPDATED LOGIC) ---
    
    // Determine the dashboard path and message based on the user's role
    const dashboardPath = role === 'admin' ? '/admin-dashboard' : '/dashboard';
    const redirectMessage = `User registered successfully. Logging you in and redirecting to ${dashboardPath}`;

    console.log(' User registration successful and saved to DB:', {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
    
    return NextResponse.json(
      { 
        message: redirectMessage,
        // Include the actual redirect path in the response for the frontend
        redirectPath: dashboardPath, 
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(' Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred during registration.' },
      { status: 500 }
    );
  }
}