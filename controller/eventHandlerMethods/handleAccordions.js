const puppeteer = require("puppeteer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const url = require("url");
const path = require("path");

async function handleAccordions(page,linksArray) {
    // Define your accordion selector
    const accordionSelector = ".lds-accordion";
    const accordions = await page.$$(accordionSelector);
    for (let i = 0; i < accordions.length; i++) {
      try {
        await accordions[i].click();
        // Wait for the content associated with the accordion to expand
        await page.waitForTimeout(2000); // Adjust the waiting time as needed
        const accordionLinks = await page.$$eval('.lds-accordion-panel-body a', (anchors) =>
        anchors.map((a) => a.href)
      );
  
      // Add links to the linksArray
      if(i==0){
        linksArray.push(...accordionLinks);
      }
      //console.log(linksArray);
        console.log(`Clicked and expanded accordion ${i}`);
      } catch (error) {
        console.error(`Error handling accordion ${i}: ${error}`);
      }
    }
    //console.log(linksArray);
  }
  module.exports=handleAccordions;