import { Schema, model, Document } from "mongoose";

export interface ItemField {
  name: string;
  desc: string;
  image?: string;
  price: number;
}

export interface ItemDocument extends ItemField, Document {
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

itemSchema.pre("findOneAndRemove", function (next) {
  //removing dependent documents
  console.log("Item pre-findOneAndRemove");
  next();
});

itemSchema.post("findOneAndRemove", function (doc) {
  console.log(`Item ${doc._id} post-findOneAndRemove`);
});

const ItemModel = model<ItemDocument>("Item", itemSchema);
export default ItemModel;
