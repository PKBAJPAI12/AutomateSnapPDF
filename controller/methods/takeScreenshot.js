const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function takeScreenshot(page,screenshotName,screenshots){
    await page.waitForTimeout(3000);
    await page.screenshot({ path: screenshotName, fullPage: true });
  
        console.log(`Full-page mobile screenshot saved as ${screenshotName}`);
  
        screenshots.push(screenshotName);
}
module.exports=takeScreenshot;