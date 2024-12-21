import cookie from "cookie";

export default async function handler(req, res) {
  try {
    const token = req.body.token;
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
