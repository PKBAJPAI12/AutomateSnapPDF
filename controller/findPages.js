const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const url = require('url');
const path = require('path');
const automateMLR=require('../automateMLR');   
//console.log(`jsonData ${jsonData}`);
async function findPages(urlName,affiliate,screentype,orderPages){
    const dataFilePath = path.join(__dirname, '..', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const urls=[];
    const pages=jsonData[affiliate];
    if (pages.length==0) {
        console.log(`No pages found for affiliate "${affiliate}"`);
        return;
    }else{
        console.log(pages);
        if(orderPages!=undefined && orderPages.length>0){
            orderPages.forEach((index) => {
                if (index >= 1 && index <= pages.length) {
                  const item = pages[index - 1];
                  urls.push(`${urlName}/${item}`);
                }
              });
              console.log(urls);
              automateMLR(urls,screentype);
        }else{
            pages.forEach((item)=>{
                urls.push(`${urlName}/${item}`);
            });
            console.log(urls);
            automateMLR(urls,screentype);
        }
    }
}
module.exports=findPages;