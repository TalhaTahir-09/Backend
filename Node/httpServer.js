const http = require("http");
const fs = require("fs")
const port = 3000;

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    fs.readFile("./index.html", function(error, data){
        if(error){
            console.log(`File Not Found ${error}`)
        }else{
            res.write(data)
        }
        res.end()
    })
});
server.listen(port, function (error) {
  if (error) {
    console.log(`Something Went Wrong`, error);
  } else {
    console.log(`Sever is listening on port: ${port}`);
  }
});
