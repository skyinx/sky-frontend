import { Pigment } from "@/models/Pigment";
import connectMongo from "@/utils/connectMongo";
import { getAllDocuments } from "@/utils/dbService";

export default async function handler(req, res) {
  try {
    const request = req?.body || {};
    await connectMongo();
    const pigment = await getAllDocuments(
      Pigment,
      request?.query || {},
      request?.options || {}
    );
    res.status(200).json({ ...pigment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
