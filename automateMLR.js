const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const url = require('url');
const path = require('path');
const screenshotsCapture=require('./screenshotsCapture');
async function automateMLR(urls,screentype){
  if(screentype==="mobile"){
    const mobileUserAgent ={
      "userAgent":'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      "width":375,
      "isMobile":true
    }
      screenshotsCapture(urls,mobileUserAgent)
  }else if(screentype==="desktop" || screentype==="laptop"){
    const desktopUserAgent ={
"userAgent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36',
"width":1280,
"isMobile":false
    }
       screenshotsCapture(urls,desktopUserAgent) 
  }else if(screentype==="laptop"){
    
  }
}
module.exports=automateMLR;