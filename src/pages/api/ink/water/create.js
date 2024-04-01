import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    console.log("req: ", JSON.parse(req.body));
    const client = await clientPromise;
    const ink = client.db("ink");
    const water = ink.collection("water_based");
    water.insertOne({ ...JSON.parse(req.body) });
    res.json({ code: 200, message: "Created Successfully" });
  } catch (e) {
    console.error(e);
  }
};
