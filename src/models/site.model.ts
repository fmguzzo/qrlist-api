import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface SiteDocument extends Document {
  owner: UserDocument["_id"];
  business: string;
  siteAdress: {
    address: string;
    city: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    business: {
      type: String,
      default: "Business",
    },
    siteAddress: {
      address: { type: String, default: "Address" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const SiteModel = model<SiteDocument>("Site", siteSchema);
export default SiteModel;
