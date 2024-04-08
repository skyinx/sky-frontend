import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};

const Schema = mongoose.Schema;
const waterSchema = new Schema(
  {
    color: {
      type: String,
      index: true,
    },
    materials: [
      {
        material: { type: Schema.Types.ObjectId, ref: "Material" },
        percentage: {
          type: String,
          default: "0",
        },
      },
    ],
    total: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

waterSchema.plugin(mongoosePaginate);

export const Water =
  mongoose.models?.Water || mongoose.model("Water", waterSchema, "waters");
