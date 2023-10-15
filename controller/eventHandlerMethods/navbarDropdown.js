const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");
async function navbarDropdown(page) {
    const dropdownColorExists = await page.$(".lds-side-nav-contact-lilly");
    const dropdownOpenExists = await page.$(".lds-contact-lilly-dropdown");
    if(dropdownColorExists && dropdownOpenExists){
      await page.evaluate(() => {
        const dropdownColor = document.querySelector(".lds-side-nav-contact-lilly");
        const dropdownOpen = document.querySelector(".lds-contact-lilly-dropdown");
        dropdownColor.style.backgroundColor = "#f5f5f5";
        dropdownOpen.style.height = "auto";
        dropdownOpen.style.display = "block";
      });
      await page.waitForTimeout(2000);
    }else{
      console.log("contact navbar not available");
    }
  }
  module.exports=navbarDropdown;