import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // --- 1. Validation ---
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role selected.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // --- 2. Mock User Creation (Simulation) ---
    
    // In a real app, you would check for duplicates here (e.g., in MongoDB).
    // For now, we simulate success and log the details.
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // WARNING: NEVER store unhashed passwords in a real app
      name,
      role,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Log the successful registration to the terminal (required screenshot element)
    console.log('--- API: NEW USER REGISTRATION SUCCESS ---');
    console.log({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      timestamp: newUser.createdAt
    });
    console.log('----------------------------------------');

    // --- 3. Send Success Response ---
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
      },
      { status: 201 } // 201 Created status
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}