import { model, Schema, Document, ObjectId } from "mongoose";
import { ListDocument } from "./list.model";

export interface CategoryField {
  listId: ListDocument["_id"];
  name: string;
  desc?: string;
  items: ObjectId[];
}

export interface CategoryDocument extends CategoryField, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "List",
    },
    name: { type: String, required: true },
    desc: { type: String },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CategoryModel = model<CategoryDocument>("Category", categorySchema);
export default CategoryModel;
