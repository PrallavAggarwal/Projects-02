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
      tag: z.string().min(1).max(50)
    })

    const parsedBody = requiredBody.safeParse({ title: title, content: content, imageUrl: imageUrl, tag: tag })
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

    let tagEntry = await tagModel.findOne({
      name: tag
    })
    //if tag not present then create an new one.
    //scope of optimization.
    let flag = false;
    if (!tagEntry) {
      flag = true;
      tagEntry = await tagModel.create({ name: tag });
      tagEntry.user.push(userId);
      await tagEntry.save();
    }

    //creating entry in blog. 
    //with also saving tag in blog.
    //scope for optimization in db call
    let blog = await blogModel.create({
      title: title,
      content: content,
      imageUrl: imageUrl,
      author: userId,
      createdAt: date,
    })
    blog.tags.push(tagEntry._id);
    await blog.save();

    //adding new blog id to corresponding tag. 
    if (flag) {
      await tagModel.findOneAndUpdate({ name: tag }, { $push: { blogs: blog._id } })
    }
    //adding blog entry to corresponding user
    // let user = await userModel.findOneAndUpdate({ _id: userId }, { $push: { blogs: blog._id, tags: tagEntry._id } });
    let user = await userModel.findById(userId).populate();
    console.log('user: ', user)

    return res.status(200).json({
      success: true,
      message: "blog created successfully.",
      blog: blog,
      user: user
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
    let tags = await tagModel.find().where('user').in([userId]);
    console.log('tags : ', tags);
    return res.status(200).json({
      success: true,
      message: "blog will be displayed soon.",
      tag: tags
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not show blogs."
    })
  }
})


module.exports = blogRoute;
