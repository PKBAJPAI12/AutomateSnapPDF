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
async function handleAccordions(page) {
  // Define your accordion selector
  const accordionSelector = ".lds-accordion";
  const accordions = await page.$$(accordionSelector);

  for (let i = 0; i < accordions.length; i++) {
    try {
      await accordions[i].click();
      // Wait for the content associated with the accordion to expand
      await page.waitForTimeout(2000); // Adjust the waiting time as needed
      console.log(`Clicked and expanded accordion ${i}`);
    } catch (error) {
      console.error(`Error handling accordion ${i}: ${error}`);
    }
  }
}
async function countryHandler(page) {
  const countrySelector = await page.$(
    "#lds-select-field-selected-countrySelector"
  );
  if (countrySelector) {
      await countrySelector.click();
      await page.waitForTimeout(2000);
      console.log("Clicked countrySelector");
  } else {
    console.log("CountrySelector button not found.");
  }
}
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
  }else{
    console.log("contact navbar not available");
  }
}
async function screenshotsCapture(urls, screenUserAgent) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const screenshots = [];
    let disable = false;
    for (const url of urls) {
      const parsedUrl = new URL(url);
      console.log(parsedUrl);
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
      const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
      const formattedUrl = urlWithoutProtocol.replace(/\./g, "_");
      const pathSegments = formattedUrl.split("/");
      const lastTwoSegments = pathSegments.slice(0, pathSegments.length - 1);
      const folderName = lastTwoSegments.join("\\");
      const folderPath = path.join(__dirname, folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      await page.goto(url);
      await page.waitForSelector(".lds-side-nav-menu-container", {
        timeout: 10000,
      });
      await page.waitForTimeout(5000);
      if(url.includes('ja-jp')){
        const modalButton=await page.$("button.lds-button-base.lds-button");
        if (modalButton) {
          console.log("run");
          
          await page.click("button.lds-button-base.lds-button");
          console.log("wait");
          await page.waitForTimeout(2000);
          //disable = true;
        }else{
          console.log("modal is not open")
        }
console.log("waitend");
        const screenshotName = `${url.replace(/https?:\/\//, "").replace(/\./g, "_")}_fullpage.png`;
        await page.screenshot({ path: screenshotName, fullPage: true });
  
        console.log(`Full-page mobile screenshot saved as ${screenshotName}`);
  
        screenshots.push(screenshotName);
      }else{
        await cookieHandler(page);
        if (!disable) {
          console.log("run");
          await page.click("button.lds-button-base.lds-button");
          await page.waitForTimeout(2000);
          disable = true;
        }
        await handleAccordions(page);
        await navbarDropdown(page);
        await countryHandler(page);
        await page.waitForTimeout(1000);
        const dropdownSelector = await page.$(
          "#lds-select-field-selected-products"
        );
        if (dropdownSelector) {
          console.log("true");
          try {
            await dropdownSelector.click();
            await page.waitForTimeout(1000);
            if(!screenUserAgent.isMobile){
              const productPerPage = 5;
              let pageno = 1;
              let shouldScroll = true;
              while (shouldScroll) {
               // console.log(pageno);
                const products = await page.$$(
                  ".lds-select-field-dropdown .lds-select-field-option.child"
                );
                console.log(products.length);
                if (products.length < productPerPage * (pageno - 1)) {
                  shouldScroll = false;
                }
                  const screenshotName = `${url.replace(/https?:\/\//, "").replace(/\./g, "_")}${pageno}_fullpage.png`;
                  await page.screenshot({ path: screenshotName, fullPage: true });
    
                  console.log(`Full-page mobile screenshot saved as ${screenshotName}`);
    
                  screenshots.push(screenshotName);
                  await page.evaluate(() => {
                    const dropdown = document.querySelector(
                      ".lds-select-field-dropdown"
                    );
                    //console.log("in");
                    if(dropdown){
                      //console.log("drop");
                      dropdown.scrollTop += dropdown.clientHeight;
                    }
                  });
                  await page.waitForTimeout(1000);
                  pageno++;
                }
            }
            }
          catch(error) {
            console.error("Error scrolling the dropdown:", error);
          }
        }else{
          console.log("dropdown not available")
        }
        const screenshotName = `${url
          .replace(/https?:\/\//, "")
          .replace(/\./g, "_")}_fullpage.png`;
        await page.screenshot({ path: screenshotName, fullPage: true });
  
        console.log(`Full-page mobile screenshot saved as ${screenshotName}`);
  
        screenshots.push(screenshotName);
      }
    }
    await browser.close();
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Iterate through the screenshots and add them to the PDF
    for (const screenshot of screenshots) {
      try {
        const imageBytes = fs.readFileSync(screenshot);
        const image = await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      } catch (error) {
        console.error(`Error processing screenshot: ${error.message}`);
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync("screenshots.pdf", pdfBytes);
    console.log("Mobile screenshots saved as screenshots.pdf");

    // Clean up: remove individual screenshot files
    for (const screenshot of screenshots) {
      fs.unlinkSync(screenshot);
    }
  })();
}

module.exports = screenshotsCapture;
