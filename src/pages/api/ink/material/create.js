// pages/api/user/index.js
import { Material } from "@/models/ink/Material";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const material = await Material.create(JSON.parse(req.body));
    res.json({ material });
  } catch (error) {
    res.json({ error: error.message });
  }
}
