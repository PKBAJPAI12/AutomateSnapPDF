const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const url = require('url');
const path = require('path');
const findPages=require('./findPages');
async function fetchAffilaite(urlName,screentype,orderPages){
    const parsedUrl = new URL(urlName);
console.log(parsedUrl.pathname);
  if(parsedUrl.pathname=="/ja-jp"){
    const affiUrl=`${parsedUrl.origin}${parsedUrl.pathname}`;
    findPages(affiUrl,'ja-jp',screentype,orderPages);
  }else if(parsedUrl.pathname=="/es-es"){
    const affiUrl=`${parsedUrl.origin}${parsedUrl.pathname}`;
    findPages(affiUrl,'es-es',screentype,orderPages);
  }
}
module.exports=fetchAffilaite;