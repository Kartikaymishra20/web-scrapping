const request =require("request");
const cheerio =require("cheerio");
const fs = require("fs");
const path =require("path");
const pdfkit =require("pdfkit");
function getIssuesPageHtml(url,topic,repoName) {
    request(url,cb);
    function cb(err,response,html) {
        if(err) {
            console.log(err);
        } else if(response.statusCode == 404) {
            console.log("page not found");
        }
        else {
           // getReposLink(html);
          // console.log(html);
          getIssues(html);
        }
    }
    function getIssues(html) {
       let $ = cheerio.load(html);
       let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
       console.log(issueElemArr.length);
       let arr =[];
       for(let i=0;i<issueElemArr.length;i++) {
        let link = $(issueElemArr[i]).attr("href");
       // console.log(link);
        arr.push(link);
       }
       //console.log(topic,"        ",arr);
      let folderpath=path.join(__dirname,topic);
       dirCreater(folderpath);
       let filePath = path.join(folderpath, repoName + ".pdf");
       fs.writeFileSync(filePath,JSON.stringify(arr));
        //let text =JSON.stringify(arr);
        let pdfDoc =new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text();
        pdfDoc.end();
    
}
}
module.exports=getIssuesPageHtml;
function dirCreater(folderpath) {
  if(fs.existsSync(folderpath)== false){
    fs.mkdirSync(folderpath);
  }
}