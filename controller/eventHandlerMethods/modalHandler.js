const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function modalHandler(page, modalButtonSelector, disable) {
    if (!disable) {
      const modalButton = await page.$(modalButtonSelector);
      if (modalButton) {
        console.log("run");
        await modalButton.click();
        await page.waitForTimeout(2000);
        disable = true;
      } else {
        console.log("modal is not open");
      }
    }
  }
module.exports=modalHandler;