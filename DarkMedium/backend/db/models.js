//in this file all schemas will be created.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URL;
mongoose.connect(url)

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
  avatarUrl: String,
})

const tag = new Schema({
  name: String,
  blogs: [{ type: ObjectId, ref: 'blog' }],
  user: [{ type: ObjectId, ref: 'user' }]
})

const responses = new Schema({
  user: { type: ObjectId, ref: 'user' },
  content: String,
  clapCount: [{ type: ObjectId, ref: 'user' }],
  subresponse: [{ type: ObjectId, ref: 'responses' }]
})

const blogModel = mongoose.model('blog', blog);
const userModel = mongoose.model('user', user);
const tagModel = mongoose.model('tag', tag);
const responsesModel = mongoose.model('responses', responses);

module.exports = {
  blogModel,
  userModel,
  tagModel,
  responsesModel
}

