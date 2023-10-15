const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function deviceHandler(page,screenUserAgent){
    const bodyHandle = await page.$("body");
    await page.waitForTimeout(1000);
    const { height } = await bodyHandle.boundingBox();
    const validViewportHeight = Math.round(height) + 1;
    await page.emulate({
      viewport: {
        width: screenUserAgent.isMobile ? 375 : screenUserAgent.width,
        height: validViewportHeight,
        isMobile: screenUserAgent.isMobile,
      },
      userAgent: screenUserAgent.userAgent,
    });
}
module.exports=deviceHandler;