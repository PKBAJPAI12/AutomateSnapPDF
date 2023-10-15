const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function directoryHandler(url) {
  const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
  const formattedUrl = urlWithoutProtocol.replace(/\./g, "_");
  const pathSegments = formattedUrl.split("/");
  const lastTwoSegments = pathSegments.slice(0, pathSegments.length - 1);
  const folderName = lastTwoSegments.join("\\");
  const folderPath = path.join(__dirname, folderName);
  console.log(folderPath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
}
module.exports=directoryHandler;
