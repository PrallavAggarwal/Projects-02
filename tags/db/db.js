//in this Tag Schema will be defined 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
require('dotenv').config();
mongoose.connect(process.env.DB_URL)


//blog schema 
const blog = new Schema({
  title: String,
  content: String,
  imageUrl: String,
  tags: [String],
  createdAt: Date,
  author: {
    type: ObjectId,
    ref: 'user'
  },
  clapCount: [{ type: ObjectId, ref: 'user' }],
  responses: [{ type: ObjectId, ref: 'user' }]
})

const user = new Schema({
  email: String,
  username: String,
  password: String,
  profilePicture: String,
  pronouns: String,
  bio: String,
  collection: [{ type: ObjectId, ref: 'blog' }],
  favourites: [{ type: ObjectId, ref: 'blog' }],
  blogs: [{ type: ObjectId, ref: 'blog' }],
  tags: [String],
  liked: [{ type: ObjectId, ref: 'blog' }],
})


const tagSchema = new Schema({
  name: String,
  blog: [{ type: ObjectId, ref: 'blog' }],
  user: [{ type: ObjectId, ref: 'user' }]
})

const blogModel = mongoose.model('blog', blog);
const userModel = mongoose.model('user', user);
const tagModel = mongoose.model('tag', tagSchema);

module.exports = {
  blogModel,
  userModel,
  tagModel
}
