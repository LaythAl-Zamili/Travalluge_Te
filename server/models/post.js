const mongoose = require('mongoose');
const schemaCleaner = require('../utils/schemaCleaner');

// Reply schema
const replySchema = new mongoose.Schema({
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  replyBody: {
    type: String,
    trim: true,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Comment schema
const commentSchema = new mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commentBody: {
    type: String,
    trim: true,
  },
  replies: [replySchema],
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  postType: {
    type: String,
    required: true,
  },
  textSubmission: {
    type: String,
    trim: true,
  },
  linkSubmission: {
    type: String,
    trim: true,
  },
  imageSubmission: {
    imageLink: {
      type: String,
      trim: true,
    },
    imageId: {
      type: String,
      trim: true,
    },
  },
  subreddit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subreddit',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  voteRatio: {
    type: Number,
    default: 0,
  },
  hotAlgo: {
    type: Number,
    default: Date.now,
  },
  controversialAlgo: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  commentCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Util function to clean up the schema
schemaCleaner(postSchema); // Removes _id and replaces with id, converts id to string from ObjectID
schemaCleaner(commentSchema); // Removes _id and replaces with id, converts id to string from ObjectID
schemaCleaner(replySchema); // Removes _id and replaces with id, converts id to string from ObjectID

module.exports = mongoose.model('Post', postSchema);
