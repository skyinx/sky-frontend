// pages/api/user/index.js
import { Ink } from "@/models/Ink";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { id } = req.query;
    const ink = await Ink.findOneAndDelete({ _id: id });
    res.json({ ink });
  } catch (error) {
    res.json({ error: error.message });
  }
}
