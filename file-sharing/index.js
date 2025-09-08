const express = require("express");

const app = express();

let port = 3001;

let fs = require("fs/promises")

app.use(express.json())

// console.log("process.argv : ", process.argv)

//it is creating url for all files in public folder.
app.use(express.static(__dirname))

//Not a right way to use : app.use(express.static('public/*'));

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

//sendPath will list all the file names in folderArray. 
//And if path is sent then it will attach path at the end of ./public
async function sendPath(req, res, next) {
  console.log("Inside sendPath middleware : value of req.query: ", req.query);
  let path = req.query.path ? req.query.path : '';
  console.log("Inside sendPath middleware : value of path : ", path);
  let url = path ? __dirname + '/' + path : __dirname;
  console.log("Inside sendPath middleware : value of url : ", url);
  try {
    const files = await fs.readdir(url, { encoding: 'utf8', withFileTypes: true })
    files.forEach(file => {
      file.isDirectory = file.isDirectory()
    });
    console.log("value of files from sendPath: ", files);
    folderArray = files;
    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "some error occured while rendering url.",
      error: err
    })
  }
}

//console.log("value of folderArray:", folderArray);
//let file = 'sample.txt';

//default route to display index.html 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//this route meant to display file searched by user. But currently not working properly.
//it is using sendFile.
//Will check this later.
app.get('/files', (req, res) => {
  //let path = req.query.path;
  // res.setHeader("Content-Type", "image/jpeg")

  console.log("req.body :", req.headers);
  let file = req.headers.filename;
  console.log("file in /files :", file);
  res.sendFile(__dirname + '/public/' + file);
})

//Now this route is displaying the all files in the folderArray.
app.get('/folder', sendPath, (req, res) => {
  console.log("Server running on PORT:", port);
  console.log("value of folderArray:", folderArray);
  res.json({
    paths: folderArray,
  });
});

app.get('/subFolder', sendPath, (req, res) => {
  try {
    console.log("value of folderArray Inside subfolder :", folderArray);
    res.json({
      success: true,
      message: "DETAILS OF SUBFOLDER",
      paths: folderArray,
    });
  }
  catch (err) {
    console.log("Error occured while searching subfolder : ", err)
    res.json({
      success: false,
      message: "error occured while searching desired subfolder.",
      error: err
    })
  }
})


app.listen(port);
