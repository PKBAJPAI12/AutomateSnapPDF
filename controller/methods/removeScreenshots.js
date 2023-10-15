const fs = require("fs");
async function removeScreenshots(screenshots){
    for (const screenshot of screenshots) {
        fs.unlinkSync(screenshot);
      }
}
module.exports=removeScreenshots;