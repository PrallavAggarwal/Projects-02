//in this file auth middleware will be coded.
//it will check user exist or not.
//via recieved tokens or cookies.

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { userModel } = require('../db/models.js');
const { success } = require("zod");


//Implement user auth logic 
async function authmiddleware(req, res, next) {
  try {
    console.log(req.headers);
    let token = req.headers.token;
    console.log("value of token fetched from req.:\n", token);
    // let token2 = token[0];
    // console.log(typeof token2)
    // console.log(token2[0])
    let decodedData = jwt.verify(token, JWT_SECRET_KEY);
    console.log("value of decodedData : \n", decodedData);
    let userid = decodedData['userid'];

    //check userid empty or not 
    if (!userid) {
      console.log("can not fetch userid.");
      return res.status(400).json({
        success: false,
        message: "userid is empty."
      })
    }

    //checking userid present in db or not.
    try {
      let user = await userModel.findById(userid);
      console.log("user fetched while auth:\n", user);
      if (!user) {
        console.log("user not present with this id during auth.");
        return res.status(400).json({
          success: false,
          message: "user not present. during auth route.",
        })
      }

      //now at this point user must present in db 
      console.log("user present in db via auth\n", user);
      req.userId = user._id;
      next();


    } catch (error) {
      console.log("errro while checking data base.")
      console.log("error : ", error)
      return res.status(500).json({
        success: false,
        message: "error while checking database. in auth route.",
        error: error
      })
    }

  } catch (error) {
    console.log("Error while user authentication.\n", error);
    return res.status(500).json({
      success: false,
      message: "error while user authentication.",
      error: error
    })

  }
}


module.exports = authmiddleware;


