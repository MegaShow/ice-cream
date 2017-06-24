/* 
 * Copyright (c) 2017 MegaShow
 * Licensed under the MIT license
 */

const fs = require('fs');
const mdConfig = JSON.parse(fs.readFileSync('config/md.json'));
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/modifyIndex', (req, res, next) => {
  console.log('Text: ' + req.body.text);
  fs.writeFile(mdConfig.path + 'index.md', req.body.text + '\n', function (err) {
    if (err) throw err;
    console.log("File Saved !"); //文件被保存
    res.send({ status: 'success' });
  });
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});


var server = app.listen(30000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
