const Post = require('../models/post');
const User = require('../models/user');
const pointsCalculator = require('../utils/pointsCalculator');

// Upvote a post
const upvotePost = async (req, res) => {
  const { id } = req.params;

  // Find the post by ID
  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  // Find the author of the post
  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(404)
      .send({ message: 'Author user does not exist in the database.' });
  }

  if (post.upvotedBy.includes(user._id.toString())) {
    // If the user has already upvoted the post, remove their upvote
    post.upvotedBy = post.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma--;
  } else {
    // If the user hasn't upvoted the post, upvote it
    post.upvotedBy = post.upvotedBy.concat(user._id);
    post.downvotedBy = post.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma++;
  }

  // Recalculate points, vote ratio, hot algorithm, and controversial algorithm
  const calculatedData = pointsCalculator(
    post.upvotedBy.length,
    post.downvotedBy.length,
    post.createdAt
  );

  post.pointsCount = calculatedData.pointsCount;
  post.voteRatio = calculatedData.voteRatio;
  post.hotAlgo = calculatedData.hotAlgo;
  post.controversialAlgo = calculatedData.controversialAlgo;

  await post.save();
  await author.save();

  res.status(201).end();
};

// Downvote a post
const downvotePost = async (req, res) => {
  const { id } = req.params;

  // Find the post by ID
  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  // Find the author of the post
  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(404)
      .send({ message: 'Author user does not exist in the database.' });
  }

  if (post.downvotedBy.includes(user._id.toString())) {
    // If the user has already downvoted the post, remove their downvote
    post.downvotedBy = post.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma++;
  } else {
    // If the user hasn't downvoted the post, downvote it
    post.downvotedBy = post.downvotedBy.concat(user._id);
    post.upvotedBy = post.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma--;
  }

  // Recalculate points, vote ratio, hot algorithm, and controversial algorithm
  const calculatedData = pointsCalculator(
    post.upvotedBy.length,
    post.downvotedBy.length,
    post.createdAt
  );

  post.pointsCount = calculatedData.pointsCount;
  post.voteRatio = calculatedData.voteRatio;
  post.hotAlgo = calculatedData.hotAlgo;
  post.controversialAlgo = calculatedData.controversialAlgo;

  await post.save();
  await author.save();

  res.status(201).end();
};

module.exports = { upvotePost, downvotePost };
