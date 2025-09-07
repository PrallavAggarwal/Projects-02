const express = require('express')
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  try {
    console.log("Server running smoothly")
    res.json({
      message: "server running fine."
    })
  } catch (error) {
    console.log("Error occured : ", error);
    res.json({
      error: error
    })
  }
})

app.listen(3002);
