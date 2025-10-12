//in this I will code 
//1. signup
//2. signin 
//3. signout 

const mongoose = require('mongoose');
const { Router } = require('express');
const userRouter = Router();
const { z, prettifyError, success } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//models 
const { userModel } = require('../db/models.js');


//middlewares 

userRouter.post('/signup', async (req, res) => {
  try {

    //gather data from req.body
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    //apply checks on data using zod.
    //zod schema created.
    const requiredBody = z.object({
      email: z.string().email(),
      username: z.string().min(3).max(10),
      password: z.string().min(8).max(100),
    });
    //now parse the inputs in schema to check format 
    let parsedBody = requiredBody.safeParse({
      email,
      username,
      password
    });
    //if format not correct then ?
    if (!parsedBody.success) {
      //now the format is not correct.
      let prettyError = prettifyError(parsedBody.error);
      console.log("error caused while checking format of inputs during sign-up :\n", prettyError);
      return res.status(400).json({
        success: false,
        route: "sign-up",
        message: prettyError,
        password: password
      })
    }
    //now at this point we have input with correct format.

    //check db. Whether this entry already exist or not.
    let user = await userModel.findOne({ email: email });
    //if user already exist then return 
    if (user) {
      console.log("user with this email already floating in our systems.");
      return res.status(400).json({
        success: false,
        message: "user with this email already floating in our systems.",
      })
    }
    //now at this point the user does not exist in our db. 
    //So we will create entry in db 

    //before creating entry password must be encrypted. Using bcrypt.
    //hashed password must be stored in db.
    let hashPassword = await bcrypt.hash(password, 4)
    user = await userModel.create({ email: email, username: username, password: hashPassword });
    console.log("entry successfully created in database\n", user);

    //sending token to cookie.
    const payload = {
      email: email,
      userid: user._id,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
    console.log("token generated while sign-up:\n", token);
    res.setHeader('Set-Cookie', token);

    return res.status(200).json({
      success: true,
      message: "Sign-up success",
      user: user
    })


  } catch (error) {
    console.log("Some error occured while sign-up.\n", error);
    return res.status(500).json({
      success: false,
      message: "Some error occured while sign-up."
    })
  }
})


//now creating sign-in route
userRouter.post('/signin', async (req, res) => {
  try {
    //gather data from req.body
    let email = req.body.email;
    let password = req.body.password;

    //apply checks on data using zod. First format check
    //zod schema created. 
    const requiredBody = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(100),
    });
    //now parse the inputs in schema to check format 
    let parsedBody = requiredBody.safeParse({
      email,
      password
    });
    //if format not correct then ?
    if (!parsedBody.success) {
      //now the format is not correct.
      let prettyError = prettifyError(parsedBody.error);
      console.log("error caused while checking format of inputs during sign-in :\n", prettyError);
      return res.status(400).json({
        success: false,
        route: "sign-in",
        message: prettyError,
      })
    }
    //now at this point we have input with correct format.

    //check if entry is in db or not.
    let user = await userModel.findOne({ email: email });
    //now if user not exist in db.
    if (!user) {
      console.log("user not present in our system. Please signup to enjoy more.");
      return res.status(400).json({
        success: false,
        message: "user not present in our system. Please signup to enjoy more."
      })
    }

    //now at this point user must exist in db.
    //now we check if password is correct or not.
    let result = bcrypt.compare(password, user.password);
    if (!result) {
      console.log("password not same. Check again.");
      return res.status(400).json({
        success: false,
        message: "password incorrect."
      })
    }
    //now password must be correct 
    //now generate token and send via headers
    const payload = {
      email: email,
      userid: user._id,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
    console.log("token generated while sign-in:\n", token);
    res.setHeader('Set-Cookie', token);

    return res.status(200).json({
      success: true,
      message: "sign-in success. Token sent.",
      token: token,
      user: user
    })




  } catch (error) {
    console.log("error while sign-in:\n", error)
    res.status(500).json({
      success: false,
      message: "error while sign-in route.",
      error: error
    })

  }
})



//sign-out route
userRouter.post('/signout', (req, res) => {
  try {

    //reset cookie with null
    res.setHeader('token', '');
    console.log("cookie set to null.");
    return res.status(200).json({
      success: true,
      message: "sign-out success."
    })

  } catch (error) {
    console.log("error while sign-out :\n", error)
    res.status(500).json({
      success: false,
      message: "error while sign-out route. ",
      error: error
    })

  }
})


module.exports = userRouter;
