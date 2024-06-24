import { User } from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { name, email, password, code } = req.body || {};
    if (code === "sky") {
      const user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.json({
        message: "user created successfully",
        success: true,
        user: newUser,
      });
    } else {
      res
        .status(401)
        .json({ message: "your are not authorized to create a user" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}
