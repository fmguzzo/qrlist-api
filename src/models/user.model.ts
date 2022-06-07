import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import config from "../config/config";

export interface UserField {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  verificationCode: string;
  isEmailVerified: boolean;
  passwordResetCode: string | null;
  isAdmin: boolean;
}

export interface UserDocument extends UserField, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "isEmailVerified",
];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
      default: () => nanoid(),
    },
    passwordResetCode: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor as number);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
