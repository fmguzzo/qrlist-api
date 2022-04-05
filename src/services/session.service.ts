import SessionModel from "../models/session.model";

export async function createSession(user: string, isAdmin: boolean) {
  const session = await SessionModel.create({ user, isAdmin });
  return session.toJSON();
}
