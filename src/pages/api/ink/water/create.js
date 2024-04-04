import { Water } from "@/models/ink/Water";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const water = await Water.create(JSON.parse(req.body));
    res.json({ water });
  } catch (error) {
    res.json({ error: error.message });
  }
}
