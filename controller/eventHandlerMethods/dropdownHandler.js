const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
const takeScreenshot=require("../methods/takeScreenshot");
const directoryHandler=require("../utility/directoryHandler");
async function dropdownHandler(page,directoryName,lastSegment,screenshots,selectId,childsId,dropdownId){
    const dropdownSelector = await page.$(selectId);
      if (dropdownSelector) {
        console.log("true");
        try {
          await dropdownSelector.click();
          await page.waitForTimeout(2000);
            const productPerPage = 5;
            let pageno = 1;
            let shouldScroll = true;
            while (shouldScroll) {
             // console.log(pageno);
              const products = await page.$$(childsId);
              console.log(products.length);
              if (products.length < productPerPage * (pageno - 1)) {
                shouldScroll = false;
              }
                const screenshotName = path.join(directoryName,`${lastSegment}${pageno}_fullpage.png`);
                await takeScreenshot(page,screenshotName,screenshots);
                await page.evaluate((dropdownIds) => {
                  const dropdown = document.querySelector(dropdownIds);
                  //console.log("in");
                  if(dropdown){
                    //console.log("drop");
                    dropdown.scrollTop += dropdown.clientHeight;
                  }
                },dropdownId);
                await page.waitForTimeout(2000);
                pageno++;
              }
          }
        catch(error) {
          console.error("Error scrolling the dropdown:", error);
        }
      }else{
        console.log("dropdown not available")
      }
}
module.exports=dropdownHandler;