// pages/api/user/index.js
import { Product } from "@/models/Product";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { id } = req.query;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json({ product });
  } catch (error) {
    res.json({ error: error.message });
  }
}
