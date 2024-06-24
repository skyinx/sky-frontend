import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter email."],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
  },
  { timestamps: true },
);

userSchema.plugin(mongoosePaginate);

export const User =
  mongoose.models?.User || mongoose.model("User", userSchema, "users");
