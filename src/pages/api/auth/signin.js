import { User } from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import bcryptjs from "bcryptjs";
import cookie from "cookie";
import { SignJWT } from "jose";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is not valid" });
    }

    const userData = {
      id: user._id,
      email: user.email,
    };

    const token = await new SignJWT({ ...userData })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60,
        secure: true,
        path: "/",
      }),
    );

    res.status(200).json({ status: "success", message: "Login successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
}
