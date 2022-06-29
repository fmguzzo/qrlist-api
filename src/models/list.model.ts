import { Schema, model, Document } from "mongoose";
import { SiteDocument } from "./site.model";

export interface ListField {
  siteId: SiteDocument["_id"];
  name: string;
  desc?: string;
  active?: boolean;
}

export interface ListDocument extends ListField, Document {
  createdAt: Date;
  updatedAt: Date;
}

const listSchema = new Schema(
  {
    siteId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "Site",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ListModel = model("List", listSchema);
export default ListModel;
