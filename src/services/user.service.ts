import UserModel, { UserField } from "../models/user.model";

export function createUser(input: Partial<UserField>) {
  return UserModel.create(input);
}
