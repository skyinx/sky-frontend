// pages/api/user/index.js
import { Pigment } from "@/models/Pigment";
import connectMongo from "@/utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { id } = req.query;
    const pigment = await Pigment.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json({ pigment });
  } catch (error) {
    res.json({ error: error.message });
  }
}
