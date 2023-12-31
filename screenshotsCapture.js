const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
const cookieHandler = require("./controller/eventHandlerMethods/cookieHandler");
const handleAccordions = require("./controller/eventHandlerMethods/handleAccordions");
const countryHandler = require("./controller/eventHandlerMethods/countryHandler");
const navbarDropdown = require("./controller/eventHandlerMethods/navbarDropdown");
const modalHandler=require("./controller/eventHandlerMethods/modalHandler");
const takeScreenshotsOfLinks = require("./controller/eventHandlerMethods/takeScreenshotsOfLinks");
const dropdownHandler = require("./controller/eventHandlerMethods/dropdownHandler");
const deviceHandler = require("./controller/utility/deviceHandler");
/*const directoryHandler = require(path.join(__dirname, "../utility/directoryHandler"));
const takeScreenshot = require(path.join(__dirname, "../methods/takeScreenshot"));*/
const directoryHandler = require("./controller/utility/directoryHandler");
const takeScreenshot = require("./controller/methods/takeScreenshot");
const convertPDF = require("./controller/methods/convertPDF");
const removeScreenshots = require("./controller/methods/removeScreenshots");
async function screenshotsCapture(urls, screenUserAgent) {
  try{
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const screenshots = [];
    let disable = false;
    for (const url of urls) {
      const parsedUrl = new URL(url);
      console.log(parsedUrl);
      await deviceHandler(page, screenUserAgent);
      let directoryName=await directoryHandler(url);
      const urlParts = url.split('/');
      const lastSegment = urlParts[urlParts.length - 1];
      console.log(url);
      await page.goto(url);
      await page.waitForSelector(".lds-side-nav-menu-container", {
        timeout: 10000,
      });
      console.log("run1");
      await page.waitForTimeout(5000);
      let linksArray = [];
      console.log("run2");
      console.log(linksArray);
      if (url.includes("ja-jp")) {
        const modalButtonSelector = ".lds-interstitial .lds-button";
        await modalHandler(page,modalButtonSelector,disable);
        console.log("waitend");
        await handleAccordions(page, linksArray);
        console.log(linksArray);
        await page.waitForTimeout(2000);
        //console.log(directoryName);
        const screenshotName = path.join(directoryName,`${lastSegment}_fullpage.png`);
        console.log(screenshotName);
        console.log(screenshots);
        await takeScreenshot(page, screenshotName, screenshots);
        if (linksArray.length > 0) {
          console.log("links");
          await takeScreenshotsOfLinks(linksArray, page, screenshots);
          console.log("wordk");
        } else {
          console.log("linksArray is Empty");
        }
      } else {
      const parsedUrl = new URL(url);
        await cookieHandler(page);
        const modalButtonSelector ="button.lds-button-base.lds-button";
        await modalHandler(page,modalButtonSelector,disable);
        await handleAccordions(page, linksArray);
        console.log(linksArray);
        await navbarDropdown(page);
        await countryHandler(page);
        await page.waitForTimeout(1000);
        if (!screenUserAgent.isMobile) {
          const selectId="#lds-select-field-selected-products";
          const childsId=".lds-select-field-dropdown .lds-select-field-option.child";
          const dropdownId=".lds-select-field-dropdown";
          await dropdownHandler(page,directoryName, lastSegment, screenshots,selectId,childsId,dropdownId);
        }
        const screenshotName = path.join(directoryName,`${lastSegment}_fullpage.png`);
          console.log(screenshotName);
        await takeScreenshot(page, screenshotName, screenshots);
        if (linksArray.length > 0) {
          console.log("links");
          await takeScreenshotsOfLinks(directoryName,linksArray, page, screenshots);
        }
      }
    }
    await browser.close();
    await convertPDF(screenshots, page);
    await removeScreenshots(screenshots);
  }catch(err){
    console.log("errorwork");
  }
}

module.exports = screenshotsCapture;
