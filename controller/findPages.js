const puppeteer = require('puppeteer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const url = require('url');
const path = require('path');
const automateMLR=require('../automateMLR');   
//console.log(`jsonData ${jsonData}`);
async function findPages(urlName,affiliate,screentype){
    const dataFilePath = path.join(__dirname, '..', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const urls=[];
    const pages=jsonData[affiliate];
    console.log(pages);
    pages.forEach((item)=>{
        urls.push(`${urlName}/${item}`);
    })
    automateMLR(urls,screentype);
    //console.log(urls);
}
module.exports=findPages;