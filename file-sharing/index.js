const express = require("express");

const app = express();

let port = 3000;

let fs = require("fs")


// fs.readFile('./sample.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(data);
//   }
// })

console.log("current directory:", __dirname);

//
// fs.readdir("../../Cohort 3.0/", { withFileTypes: true, recursive: false }, (err, file) => {
//   if (err) {
//     console.log("Error : ", err);
//   }
//   else {
//     console.log("file : ", file[0]);
//     file.forEach(element => {
//       console.log(element.parentPath);
//       let file = element.parentPath;
//       let fileName = element.name;
//       // fs.readFile(file, "utf8", (err, data) => {
//       //   if (err) {
//       //     console.log("error while reading file : ", err);
//       //   }
//       //   else {
//       //     console.log(fileName, " :\n", data);
//       //   }
//       // })
//     });
//   }
// })

let file = 'sample.txt';

app.get('/files', (req, res) => {
  //let path = req.query.path;
  // res.setHeader("Content-Type", "image/jpeg")
  res.sendFile(__dirname + '/public/' + file);
})

app.get('/', (req, res) => {
  console.log("Server running on PORT:", port);
  res.send(`<h1> Prallav </h1>`);
});

app.listen(port);
