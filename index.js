const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const url = require('url');
const path = require('path');
const fetchAffilaite=require('./controller/fetchAffilaite');
const args = process.argv.slice(2);
console.log(args);
const urlName = args[0]; 
const screentype = args[1];
const pages = args[2];
console.log(pages);
let orderPages;
if(pages!=undefined){
  orderPages = pages.split('/').map(Number);
}
console.log(orderPages);
console.log(screentype);
  if (urlName.length === 0) {
    console.error('Please provide one or more URLs as command-line arguments.');
    process.exit(1);
  }
fetchAffilaite(urlName,screentype,orderPages);