import { Ink } from "@/models/Ink";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const ink = await Ink.create(req.body);
    res.json({ ink });
  } catch (error) {
    res.json({ error: error.message });
  }
}
