const multer = require("multer");



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file in storage', file)
    cb(null, __dirname + '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage });

module.exports = upload;


