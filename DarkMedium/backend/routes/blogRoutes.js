//this will contain
// 1. Create
// 2. Delete 
// 3. Read 
// 4. Update
// routes for blogs by signed in user.
//
//


const { Router } = require('express');
const blogRoute = Router();
const { blogModel, tagModel, userModel } = require('../db/models.js')
const { z } = require('zod');
const authmiddleware = require('../middlewares/auth.js')

blogRoute.post('/create', authmiddleware, async (req, res) => {

  try {
    let title = req.body.title;
    let content = req.body.content;
    let imageUrl = req.body.imageUrl;
    let date = Date();
    let userId = req.userId;
    let tag = req.body.tag;

    //some checks 
    //must entries : {title, content, image, userid, tags}
    //checks : {not empty, string, min-max length}
    if (!title || !content || !imageUrl || !userId || !tag) {
      if (!title) console.log("title missing.");
      if (!content) console.log("content missing.");
      if (!imageUrl) console.log("imageUrl missing.");
      if (!tag) console.log("tag missing.");
      if (!userId) console.log("userId missing.")

      return res.status(400).json({
        success: false,
        message: "something is missing."
      })
    }

    //to string and mnin-max length
    // title = toString(title);
    // content = toString(content);
    // imageUrl = toString(imageUrl);
    // tag = toString(tag);

    const requiredBody = z.object({
      title: z.string().min(8).max(50),
      content: z.string().min(8).max(1000),
      imageUrl: z.string().min(8).max(100),
      //   tag: z.string().min(1).max(50)
    })

    const parsedBody = requiredBody.safeParse({
      title: title,
      content: content,
      imageUrl: imageUrl,
      tag: tag
    })
    if (!parsedBody.success) {
      let prettyError = z.prettifyError(parsedBody.error)

      console.log("error : ", prettyError)

      return res.status(400).json({
        success: false,
        message: "something wrong with the format.",
        prettyError: prettyError
      })
    }


    //entry in database 

    //:::::::::::::::creating blog entry in db:::::::::::
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


    //:::::::::::::Approach 3rd for updating tag schema ::::::::::::
    //to decrease complexity due to loops and db calls.
    //:::::::::::::Creating tag entry in db:::::::::::::::
    tag.map(async (item) => {
      let newTag = await tagModel.findOne({ name: item });
      if (!newTag) {
        newTag = new tagModel({
          name: item,
          user: [userId],
          blogs: [blogEntry._id]
        })
        await newTag.save();
      } else {
        if (!newTag.user.includes(userId)) {
          newTag.user.push(userId);
        }
        if (!newTag.blogs.includes(blogEntry._id)) {
          newTag.blogs.push(blogEntry._id);
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

  }
  catch (error) {
    console.log("error while creating blog : ", error);
    return res.status(500).json({
      success: false,
      message: "error while creating blog."
    })
  }
})


//read blogs 
//general read : this api will show all blogs.
//user read.
blogRoute.get('/blogs', authmiddleware, async (req, res) => {
  try {
    let userId = req.userId;
    let tags = await tagModel.find().where('user').in([userId]).populate('blogs');
    console.log('tags : ', tags);

    let displayBlogList = [];
    let uniqueBlogEntry = new Map();
    tags.map((item) => {
      //storing blogs only it lenght is not zero.

      if (item.blogs.length != 0) {
        //console.log(item.blogs);
        //pushing only unique blogs from array of blogs from each tag.

        item.blogs.forEach(blog => {
          console.log("id : ", JSON.stringify(blog._id));
          let id = JSON.stringify(blog._id);
          if (!uniqueBlogEntry.has(id)) {
            uniqueBlogEntry.set(id, blog);
            displayBlogList.push(blog);

          }
        })
      }
    });
    console.log("display blog list : ", displayBlogList)
    return res.status(200).json({
      success: true,
      message: "blog will be displayed soon.",
      tag: tags
    })

  } catch (error) {
    console.log("error while displaying blogs : ", error)
    return res.status(500).json({
      success: false,
      message: "can not show blogs in blogs route.",
      error: error
    })
  }
})


module.exports = blogRoute;
