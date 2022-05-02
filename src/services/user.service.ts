import { FilterQuery } from "mongoose";
import UserModel, { UserField, UserDocument } from "../models/user.model";

export async function createUser(input: Partial<UserField>) {
  return UserModel.create(input);
}

export async function findUserById(id: string) {
  return UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

// General findUser()
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
