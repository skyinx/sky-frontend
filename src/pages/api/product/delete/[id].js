// pages/api/user/index.js
import { Product } from "@/models/Product";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { id } = req.query;
    const product = await Product.findOneAndDelete({ _id: id });
    res.json({ product });
  } catch (error) {
    res.json({ error: error.message });
  }
}
