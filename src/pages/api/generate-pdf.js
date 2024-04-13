import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  ejs.renderFile(
    path.join(process.cwd(), "templates", "need.ejs"),
    JSON.parse(req?.body || "{}"),
    async (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error Generating PDF" });
        return;
      }
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setContent(html);
      await page.waitForSelector("body");
      const pdfBuffer = await page.pdf({
        format: "A4",
      });
      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", pdfBuffer.length);

      res.send(pdfBuffer);
    },
  );
}
