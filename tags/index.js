//in this I am going to create tag system 
//I am very much confused in this tag 


const express = require('express');
const app = express();
const { userModel, tagModel, blogModel } = require('./db/db.js')

app.use(express.json());

app.get('/tag', (req, res) => {

});

app.post('/user/create', async (req, res) => {
  try {

    //gather data from req.body
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    let user = await userModel.findOne({ email: email });
    //if user already exist then return 
    if (user) {
      console.log("user with this email already floating in our systems.");
      return res.status(400).json({
        success: false,
        message: "user with this email already floating in our systems.",
      })
    }

    user = await userModel.create({ email: email, username: username, password: password });
    console.log("entry successfully created in database\n", user);
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

app.post('/blog/create', async (req, res) => {
  try {

    let title = req.body.title;
    let content = req.body.content;
    let imageUrl = req.body.imageUrl;
    let date = Date().toLocaleString();
    let userId = req.body.userId;
    let tag = req.body.tag;

    //pass array of tags.
    console.log("tags from request body : ", tag)


    //::::::::::Approach 1st to create tag entry::::::::::::::
    // let tagEntry = await tagModel.find();
    // let isTagPresent = false;
    // let isUser = false;
    // console.log('tagEntry : ', tagEntry)
    // tagEntry.forEach(obj => {
    //   if (tag.includes(obj.name)) {
    //     isTagPresent = true;
    //     console.log('tag present ', obj.name)
    //     if (obj.user.includes(userId)) {
    //       isUser = true;
    //       console.log('user present')
    //     }
    //     else {
    //       obj.user.push(userId);
    //     }
    //   }else{
    //     newTag.name = 
    //   }
    //
    // })


    //creating blog entry first.
    let blogEntry = await blogModel.create({
      title,
      content,
      imageUrl,
      createdAt: date,
      author: userId,
      tags: tag
    });

    console.log(":::::::::::::blog created:::::::::::::::::::\n", blogEntry);
    console.log("::::::::::::::::::::::::::::::::::::::::::::::")


    //:::::::::::::Approach 2nd to create entry in tag::::::::::
    // tag.forEach(async element => {
    //   tagEntry.forEach(async obj => {
    //     if (element == obj.name) {
    //       //if tag name already in collection 
    //       isTagPresent = true;
    //       console.log('tag present ', obj.name)
    //       if (obj.user.includes(userId)) {
    //         isUser = true;
    //         console.log('user present')
    //       } else {
    //         //if tag name not present in collection 
    //         obj.user.push(userId);
    //       }
    //       obj.blog.push(blogEntry._id);
    //       await obj.save();
    //     }
    //   })
    //   //tagEntry ke loop se bahar
    //   if (!isTagPresent) {
    //     //if tag name not present in collection 
    //     let newTag = new tagModel({
    //       name: element,
    //       user: [userId],
    //       blog: [blogEntry._id]
    //     })
    //     await newTag.save();
    //     // newTag.name = element;
    //     // newTag.user.push(userId);
    //   }
    // });


    //:::::::::::::Approach 3rd for updating tag schema ::::::::::::
    //to decrease complexity due to loops and db calls.
    tag.map(async (item) => {
      let newTag = await tagModel.findOne({ name: item });
      if (!newTag) {
        newTag = new tagModel({
          name: item,
          user: [userId],
          blog: [blogEntry._id]
        })
        await newTag.save();
      } else {
        if (!newTag.user.includes(userId)) {
          newTag.user.push(userId);
        }
        if (!newTag.blog.includes(blogEntry._id)) {
          newTag.blog.push(blogEntry._id);
        }
        await newTag.save();
      }
    })



    console.log("tag at last : ", tag)

    //::::::::Creating user entry in db:::::::::::
    let userEntry = await userModel.findOneAndUpdate({ _id: userId }, {
      $addToSet: { tags: { $each: tag } },
      $push: { blogs: blogEntry._id }
    }, { new: true })

    console.log("user entry : ", userEntry)
    let tagEntry = await tagModel.find();
    // console.log("tagentry after push", tagEntry)

    return res.status(200).json({
      message: "success",
      blogEntry: blogEntry,
      userEntry: userEntry,
      tagEntry: tagEntry
    })

  } catch (error) {
    console.log("Some error occured while creating blog.\n", error);
    return res.status(500).json({
      success: false,
      message: "Some error occured while creating blog."
    })

  }
})

app.listen(3000);
