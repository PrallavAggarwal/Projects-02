const express = require("express");
const app = express();
const fs = require("fs");
let count = 0;

//function to write log into file
// fs.appendFile('log.txt', 'heloo there', (err) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log("file created and data appended.");
//   }
// })
//
app.use((req, res, next) => {
  //kya kya log krna h ?
  //1.Date, 2.Time, 3.IP, 4.URL
  let date = new Date().toString();
  let ip = req.ip;
  let method = req.method;
  let url = req.url;
  let hostname = req.hostname;
  count++;
  fs.appendFile('log.txt', `${count} : ${date} || ${ip} || ${method} || ${url} || ${hostname} \n`, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("entry logged successfully.");
    }
  })
  next();
});

app.get('/apple', (req, res) => {
  res.send(`<h1>apple</h1>`);
})
app.get('/orange', (req, res) => {
  res.send(`<h1>orange</h1>`);
})
app.get('/', (req, res) => {
  res.send(`<h1>Hey ${req.hostname}</h1>`);
})



app.listen(3000);
