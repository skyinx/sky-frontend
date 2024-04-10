import { paginationLabels } from "@/constants/pagination";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoosePaginate.paginate.options = {
  customLabels: paginationLabels,
};
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name."],
      unique: [true, "Product already exists."],
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
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
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

productSchema.plugin(mongoosePaginate);

export const Product =
  mongoose.models?.Product ||
  mongoose.model("Product", productSchema, "products");
