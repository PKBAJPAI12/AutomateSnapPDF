const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function cookieHandler(page) {
    const acceptCookie = await page.$("#accept-new");
    if (acceptCookie) {
        await acceptCookie.click();
        await page.waitForTimeout(2000);
        console.log("Accepted cookie policy");
    } else {
      console.log("Cookie policy button not found.");
    }
  }

 module.exports=cookieHandler; 