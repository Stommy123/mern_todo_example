import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  return isCorrectPassword ? user : null;
};

UserSchema.pre('save', async function (next) {
  const user = this;

  const encryptedPassword = await bcrypt.hash(user.password, 6);

  user.password = encryptedPassword;

  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const query = this;
  const update = query.getUpdate();

  if (!update.password) next();

  const encryptedPassword = await bcrypt.hash(update.password, 6);

  update.password = encryptedPassword;

  next();
});

const User = model('User', UserSchema);

export default User;
