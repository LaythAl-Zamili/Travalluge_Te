const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemaCleaner = require('../utils/schemaCleaner');
const { commentSchema } = require('./post');

// User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      exists: {
        type: Boolean,
        default: 'false',
      },
      imageLink: {
        type: String,
        trim: true,
        default: 'null',
      },
      imageId: {
        type: String,
        trim: true,
        default: 'null',
      },
    },
    karmaPoints: {
      postKarma: {
        type: Number,
        default: 0,
      },
      commentKarma: {
        type: Number,
        default: 0,
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    subscribedSubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subreddit',
      },
    ],
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Plugin for unique validation
userSchema.plugin(uniqueValidator);

// Util function to clean up the schema
schemaCleaner(userSchema); // Removes _id and replaces with id, converts id to string from ObjectID

module.exports = mongoose.model('User', userSchema);
