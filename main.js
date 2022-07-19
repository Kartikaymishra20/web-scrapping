let url ="https://github.com/topics";
const request =require("request");
const cheerio =require("cheerio");

const getReposPageHtml = require("./reposPage");
request(url,cb);
function cb(err,response,html) {
    if(err) {
        console.log(err);
    } else {
       // console.log(html);
       getTopicLinks(html);
    }
}
function getTopicLinks(html) {
 let $ = cheerio.load(html);
let linkEleArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
for(let i=0;i<linkEleArr.length;i++) {
   let href = $(linkEleArr[i]).attr("href");
   let topic=href.split("/").pop();
   //console.log(href);
   let fullLink =`https://github.com/${href}`;
   getReposPageHtml(fullLink,topic);
}
}