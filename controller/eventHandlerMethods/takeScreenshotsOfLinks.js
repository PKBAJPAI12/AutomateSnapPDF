const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
const directoryHandler=require("../utility/directoryHandler");
const takeScreenshot=require("../methods/takeScreenshot");
async function takeScreenshotsOfLinks(linksArray, page,screenshots) {
    for (const url of linksArray) {
      await directoryHandler(url);
      await page.goto(url);
      const screenshotName = `${url.replace(/https?:\/\//, "").replace(/\./g, "_")}.png`;
      await takeScreenshot(page,screenshotName,screenshots);
    }
  }
  module.exports=takeScreenshotsOfLinks;