import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
  user: string;
  isAdmin: boolean;
}

const sessionSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const SessionModel = mongoose.model<SessionDocument>("session", sessionSchema);
export default SessionModel;
