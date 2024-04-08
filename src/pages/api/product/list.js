import { Product } from "@/models/Product";
import connectMongo from "@/utils/connectMongo";
import { getAllDocuments } from "@/utils/dbService";

export default async function handler(req, res) {
  try {
    const request = req?.body || {};
    await connectMongo();
    const product = await getAllDocuments(
      Product,
      request?.query || {},
      request?.options || {}
    );
    res.status(200).json({ ...product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
