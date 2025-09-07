const express = require("express");

const app = express();

let port = 3001;

let fs = require("fs")

app.use(express.json())

app.use(express.static('public'));

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


let folderArray = [];
function sendPath(req, res, next) {
  console.log("value of req.query: ", req.query);
  let path = req.query.path ? req.query.path : '';
  let url = path ? './public/' + path : './public';
  fs.readdir(url, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      files.forEach(file => {
        file.isDirectory = file.isDirectory()
      });
      console.log(files);
      folderArray = files;
    }
  });
  next();
}
console.log("value of folderArray:", folderArray);
//let file = 'sample.txt';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/files', (req, res) => {
  //let path = req.query.path;
  // res.setHeader("Content-Type", "image/jpeg")

  console.log("req.body :", req.headers);
  let file = req.headers.filename;
  console.log("file in /files :", file);
  res.sendFile(__dirname + '/public/' + file);
})

app.get('/folder', sendPath, (req, res) => {
  console.log("Server running on PORT:", port);
  console.log("value of folderArray:", folderArray);
  res.json({
    paths: folderArray,
  });
});

app.get('/')


app.listen(port);
