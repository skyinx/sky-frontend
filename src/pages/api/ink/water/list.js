import { Water } from "@/models/ink/Water";
import connectMongo from "@/utils/connectMongo";
import { getAllDocuments } from "@/utils/dbService";

export default async function handler(req, res) {
  try {
    const request = JSON.parse(req?.body || "{}");
    await connectMongo();
    const water = await getAllDocuments(
      Water,
      request?.query || {},
      request?.options || {}
    );
    res.status(200).json({ ...water });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
