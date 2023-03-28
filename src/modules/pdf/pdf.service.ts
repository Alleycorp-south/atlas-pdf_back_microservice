import puppeteer from "puppeteer";

import {
  GeneratePdfFromHtmlInput,
} from "./dto/generate-pdf-from-html-input.dto";

/**
 *
 *
 * @export
 * @class PdfService
 */
export class PdfService {
  /**
   *
   *
   * @param {GeneratePdfFromHtmlInput} input
   * @return {*}  {Promise<string>}
   * @memberof PdfService
   */
  public static async generatePdfFromHtml(
    input: GeneratePdfFromHtmlInput,
  ): Promise<string> {
    const {html} = input;

    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    await page.setContent(html, {waitUntil: "domcontentloaded"});

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType("screen");


    // Downlaod the PDF
    const pdf = await page.createPDFStream({
      margin: {top: "100px", right: "50px", bottom: "100px", left: "50px"},
      printBackground: true,
      format: "A4",
    });

    // transform the stream into a buffer
    const buffer = await new Promise<Buffer>((resolve) => {
      const chunks: any[] = [];
      pdf.on("data", (chunk) => chunks.push(chunk));
      pdf.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // convert the buffer to base64
    const base64 = buffer.toString("base64");

    // Close the browser instance
    await browser.close();

    return base64;
  }
}
