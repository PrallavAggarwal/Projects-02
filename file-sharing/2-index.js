// const buff = Buffer.from("Prallav", 'utf8');
// console.log("Encoding i.e. String to Buffer using utf8 :")
//
// console.log("Buffer :", buff);
// const buff2 = Buffer.from("Prallav", 'base64');
// console.log("Encoding i.e. String to Buffer using base64 :")
//
// console.log("Buffer :", buff2);
//
// console.log("Now BUFFER -> STRING :");
// console.log("1. UTF8 : ", buff.toString('utf8'));
// console.log("2. base64 : ", buff.toString('base64'))
//

const fs = require("fs/promises")


// fs.opendir('./')
//   .then((dir) => {
//     console.log(dir)
//   })
//   .catch((err) => { console.log(err) });
//
// async function openDir() {
//   try {
//     const dir = await fs.opendir('./');
//     for await (const dirent of dir) {
//       console.log(dirent.name);
//     }
//   }
//   catch (err) {
//     console.log(err);
//   }
// }
// openDir();


// import { opendir } from 'node:fs/promises';
async function openDir() {
  try {
    const dir = await fs.opendir('./');
    console.log("openDir ::::::::::::::::::::::")
    console.log(dir);
    for await (const dirent of dir) {
      //      let node = document.createElement('div')
      //      node.classname = 'subfolder'
      //      node.innerHTML = `<b>${dirent.name}</b>`
      //      document.getElementById("folders").appendChild('node');
      console.log(dirent.name);
    }
  }
  catch (err) {
    console.log(err);
  }
}
openDir();


async function readDir() {
  try {
    const file = await fs.readdir('./');
    console.log("readDir ::::::::::::::::::::::::::");
    console.log(file)
    console.log(file[4])
    //for await (const dirent of dir) {
    //      let node = document.createElement('div')
    //      node.classname = 'subfolder'
    //      node.innerHTML = `<b>${dirent.name}</b>`
    //      document.getElementById("folders").appendChild('node');
    //console.log(dirent.name);
    //}
  }
  catch (err) {
    console.log(err);
  }
}
readDir();
