const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const port = process.env.PORT;
const dburl = process.env.DB_URL;

const blogRoute = require('./routes/blogRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/blog', blogRoute);

app.get('/', (req, res) => {
  res.send(`<h1>Hello</h1>`);
})


async function main() {
  try {
    await mongoose.connect(dburl);
    console.log("db connected...");
    app.listen(port);
    console.log(`app listening at ${port}`)
  } catch (error) {
    console.log("error while starting server.")
  }
}

main();
