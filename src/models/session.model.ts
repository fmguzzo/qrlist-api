import { Document, Schema, model, Types } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  //user: Types.ObjectId;
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<SessionDocument>("Session", sessionSchema);
export default SessionModel;
