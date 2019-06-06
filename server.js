'use strict'
const http = require('http'),
	  fs = require('fs'),
	  port = 8080,
	  host = '127.0.0.1',
	  url = require('url');



http.createServer(function(req, res){
	let link = "." + url.parse(req.url).href;
	
	link = link + ((link == "./" || link[link.length - 1] == "/")?"index.html":"");

	let contentType = (link.slice(link.lastIndexOf(".") + 1) == "js") ?
						 "application/javascript":
					  (link.slice(link.lastIndexOf(".") + 1) == "json")?
					  	 "application/json":
						 	"text/" + link.slice(link.lastIndexOf(".") + 1);

	res.setHeader("Content-type", contentType);

	fs.readFile(link, function(err, content){
		res.writeHead(200);
		res.write(decodeURIComponent(content));
		res.end();
	});

}).listen(port, host)