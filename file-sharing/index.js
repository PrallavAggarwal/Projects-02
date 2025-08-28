const express = require("express");

const app = express();

let port = 3000;

let fs = require("fs")
fs.readFile('./sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
})
app.get('/files', (req, res) => {
  //let path = req.query.path;
  fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    };
    res.send(data);
  })
})

app.get('/', (req, res) => {
  console.log("Server running on PORT:", port);
  res.send(`<h1> Prallav </h1>`);
});

app.listen(port);
