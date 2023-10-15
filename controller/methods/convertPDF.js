const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function convertPDF(screenshots,page){
    const pdfDoc = await PDFDocument.create();
    for (const screenshot of screenshots) {
        try {
          const imageBytes = fs.readFileSync(screenshot);
          const image = await pdfDoc.embedPng(imageBytes);
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        } catch (error) {
          console.error(`Error processing screenshot: ${error.message}`);
        }
      }
  
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync("screenshots.pdf", pdfBytes);
      console.log("Mobile screenshots saved as screenshots.pdf");
}
module.exports=convertPDF;