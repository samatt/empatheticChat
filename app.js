// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var path = require('path');

var HTTP_OK = 200,
    HTTP_ERR_UNKNOWN = 500,
    HTTP_ERR_NOT_FOUND = 404;

httpServer.listen(8080);

function requestHandler(req, res) {
	

    var filepath =  (req.url == '/' ? 'index.html' : '.' +req.url) ,
        fileext = path.extname(filepath); 

console.log("Request for " + filepath+ " received.");
    fs.exists(filepath, function (f) {
console.log(f);
        if (f) {

            fs.readFile(filepath, function (err, content) {
                if (err) {
                    res.writeHead(HTTP_ERR_UNKNOWN);
                    res.end();
                } else {
                    res.writeHead(HTTP_OK, contentType(fileext));
                    res.end(content);
                }
            });
        } else {
            res.writeHead(HTTP_ERR_NOT_FOUND);
            res.end();
        }
    });
}

function contentType(ext) {
    var ct;

    switch (ext) {
    case '.html':
        ct = 'text/html';
        break;
    case '.css':
        ct = 'text/css';
        break;
    case '.js':
        ct = 'text/javascript';
        break;
    default:
        ct = 'text/plain';
        break;
    }

    return {'Content-Type': ct};
}