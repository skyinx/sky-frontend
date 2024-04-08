import { Ink } from "@/models/Ink";
import connectMongo from "@/utils/connectMongo";
import { getAllDocuments } from "@/utils/dbService";

export default async function handler(req, res) {
  try {
    const request = req?.body || {};
    await connectMongo();
    const ink = await getAllDocuments(
      Ink,
      request?.query || {},
      request?.options || {}
    );
    res.status(200).json({ ...ink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
