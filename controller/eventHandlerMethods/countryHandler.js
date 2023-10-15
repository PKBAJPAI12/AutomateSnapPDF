const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function countryHandler(page) {
    const countrySelector = await page.$("#lds-select-field-selected-countrySelector");
    if (countrySelector) {
        await countrySelector.click();
        await page.waitForTimeout(2000);
        console.log("Clicked countrySelector");
    } else {
      console.log("CountrySelector button not found.");
    }
  }
  module.exports=countryHandler;