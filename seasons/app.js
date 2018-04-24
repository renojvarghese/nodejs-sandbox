'use strict';
const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer( (req, res) => {
    let q = url.parse(req.url, true);
    let filename = q.pathname == "/" ? "./index.html" : "." + q.pathname;
    fs.readFile(filename, (err, file) => {
        if (err) {
            res.writeHeader(404, {"Content-Type": "text/html"});
            res.write("404 not found");
            res.end();
        }
        else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(file);
            res.end()
        }
    })

}).listen(8080);
