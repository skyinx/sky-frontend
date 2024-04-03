import { Material } from "@/models/ink/Material";
import connectMongo from "@/utils/connectMongo";
import { getAllDocuments } from "@/utils/dbService";

export default async function handler(req, res) {
  try {
    const request = JSON.parse(req?.body || "{}");
    await connectMongo();
    const materials = await getAllDocuments(
      Material,
      request?.query || {},
      request?.options || {}
    );
    res.status(200).json({ ...materials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
