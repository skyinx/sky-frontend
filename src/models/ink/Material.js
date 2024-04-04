import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};
const Schema = mongoose.Schema;
const materialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

materialSchema.plugin(mongoosePaginate);

export const Material =
  mongoose.models?.Material ||
  mongoose.model("Material", materialSchema, "materials");
