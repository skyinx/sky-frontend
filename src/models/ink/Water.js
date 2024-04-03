import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongooseIdValidator from "mongoose-id-validator";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};

const Schema = mongoose.Schema;
const waterSchema = new Schema(
  {
    color: {
      type: String,
      required: [true, "Please provide a name."],
    },
    materials: [
      {
        material: { type: Schema.Types.ObjectId, ref: "Material" },
        percentage: {
          type: Number,
          default: 0,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

waterSchema.plugin(mongoosePaginate);
waterSchema.plugin(mongooseIdValidator);

export const Water =
  mongoose.models.Water || mongoose.model("Water", waterSchema, "materials");
