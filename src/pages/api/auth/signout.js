import cookie from "cookie";

export default async function handler(req, res) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        maxAge: 0,
        secure: true,
        path: "/",
      }),
    );
    res.json({ message: "Logout successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
}
