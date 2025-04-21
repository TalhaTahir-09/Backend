let path = require("node:path");
// console.log(path.basename(`C:\\Users\\M.Talha Tahir\\Desktop\\Backend.js\\index.html`, ".html"));
// console.log(path.dirname)
// console.log(path.sep)
// console.log(path.join("foo", "talha", "poo","soo"));
// console.log(path.normalize("//foo//tlaha/bear//me"));
// console.log(path.parse("C:\\Users\\M.Talha Tahir\\Desktop\\Backend.js"));
const pathObj = path.parse(__filename)
console.log(pathObj)