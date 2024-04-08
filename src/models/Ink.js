import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};
const Schema = mongoose.Schema;
const inkSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a ink name."],
      unique: [true, "Ink already exists."],
    },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        percentage: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

inkSchema.plugin(mongoosePaginate);

export const Ink =
  mongoose.models?.Ink || mongoose.model("Ink", inkSchema, "inks");
