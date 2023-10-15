const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
const directoryHandler=require("../utility/directoryHandler");
const takeScreenshot=require("../methods/takeScreenshot");
async function takeScreenshotsOfLinks(linksArray, page,screenshots) {
    for (const url of linksArray) {
      const urlParts = url.split('/');
      const lastSegment = urlParts[urlParts.length - 1];
      console.log("url");
      let directoryName=await directoryHandler(url);
      console.log(url);
      await page.goto(url);
      const screenshotName = path.join(directoryName,`${lastSegment}_fullpage.png`);
      console.log(screenshotName);
      await takeScreenshot(page,screenshotName,screenshots);
    }
  }
module.exports=takeScreenshotsOfLinks;