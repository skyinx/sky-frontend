import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const ink = client.db("ink");
    const water = ink.collection("water_based");
    water.insertOne({ ...JSON.parse(req.body) });
    res.status(200).json({ code: "SUCCESS", message: "Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: "ERROR", message: error.message });
  }
}
