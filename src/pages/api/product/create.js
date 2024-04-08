// pages/api/user/index.js
import { Product } from "@/models/Product";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const product = await Product.create(req.body);
    res.json({ product });
  } catch (error) {
    res.json({ error: error.message });
  }
}
