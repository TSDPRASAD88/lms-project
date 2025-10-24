import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true, 
    enum: ['student', 'admin'], // Optional: Adds basic validation
    default: 'student' 
  },
  // Added for better practice, though not explicitly required
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
}, { 
  // Optional: Automatically adds createdAt and updatedAt fields
  timestamps: true 
});

// This conditional export prevents the "OverwriteModelError" that occurs
// during Next.js development hot-reloads/re-compiles.
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;