import UserModel, { UserField } from "../models/user.model";

export function createUser(input: Partial<UserField>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
