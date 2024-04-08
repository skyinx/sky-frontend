import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};
const Schema = mongoose.Schema;
const pigmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a pigment name."],
      unique: [true, "Pigment already exists."],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

pigmentSchema.plugin(mongoosePaginate);

export const Pigment =
  mongoose.models?.Pigment ||
  mongoose.model("Pigment", pigmentSchema, "pigments");
