import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
    verified: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
