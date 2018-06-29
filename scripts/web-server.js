var express = require('express');
var path = require('path');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + '/app'));

app.listen(8000);
console.log('listening on port 8000 ...');