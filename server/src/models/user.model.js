import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
  },
  { timestamps: true }
);

// Setup to hash password before storing to database
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare passwords before logging user in
userSchema.methods.comparePassword = async function (enteredPassword) {
  const passwordMatch = await bcrypt.compare(enteredPassword, this.password);
  return passwordMatch;
};

const User = model('User', userSchema);

export default User;
