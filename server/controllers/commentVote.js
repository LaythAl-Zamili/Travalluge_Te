const Post = require('../models/post');
const User = require('../models/user');

// Function for upvoting a comment
const upvoteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  // Check if the post exists
  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: 'User does not exist in the database.' });
  }

  const targetComment = post.comments.find((c) => c._id.toString() === commentId);

  // Check if the comment exists
  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}' does not exist in the database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  // Check if the comment author exists
  if (!commentAuthor) {
    return res.status(404).send({ message: 'Comment author does not exist in the database.' });
  }

  if (targetComment.upvotedBy.includes(user._id.toString())) {
    // User has already upvoted the comment, remove their upvote
    targetComment.upvotedBy = targetComment.upvotedBy.filter((u) => u.toString() !== user._id.toString());

    // Decrease the comment author's comment karma
    commentAuthor.karmaPoints.commentKarma--;
  } else {
    // User hasn't upvoted the comment, add their upvote
    targetComment.upvotedBy = targetComment.upvotedBy.concat(user._id);
    targetComment.downvotedBy = targetComment.downvotedBy.filter((d) => d.toString() !== user._id.toString());

    // Increase the comment author's comment karma
    commentAuthor.karmaPoints.commentKarma++;
  }

  // Update the points count of the comment based on upvotes and downvotes
  targetComment.pointsCount = targetComment.upvotedBy.length - targetComment.downvotedBy.length;

  // Update the comment in the post
  post.comments = post.comments.map((c) => (c._id.toString() !== commentId ? c : targetComment));

  // Save the updated post and comment author
  await post.save();
  await commentAuthor.save();

  res.status(201).end();
};

// Function for downvoting a comment
const downvoteComment = async (req, res) => {
  const { id, commentId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  // Check if the post exists
  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: 'User does not exist in the database.' });
  }

  const targetComment = post.comments.find((c) => c._id.toString() === commentId);

  // Check if the comment exists
  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}' does not exist in the database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  // Check if the comment author exists
  if (!commentAuthor) {
    return res.status(404).send({ message: 'Comment author does not exist in the database.' });
  }

  if (targetComment.downvotedBy.includes(user._id.toString())) {
    // User has already downvoted the comment, remove their downvote
    targetComment.downvotedBy = targetComment.downvotedBy.filter((d) => d.toString() !== user._id.toString());

    // Increase the comment author's comment karma
    commentAuthor.karmaPoints.commentKarma++;
  } else {
    // User hasn't downvoted the comment, add their downvote
    targetComment.downvotedBy = targetComment.downvotedBy.concat(user._id);
    targetComment.upvotedBy = targetComment.upvotedBy.filter((u) => u.toString() !== user._id.toString());

    // Decrease the comment author's comment karma
    commentAuthor.karmaPoints.commentKarma--;
  }

  // Update the points count of the comment based on upvotes and downvotes
  targetComment.pointsCount = targetComment.upvotedBy.length - targetComment.downvotedBy.length;

  // Update the comment in the post
  post.comments = post.comments.map((c) => (c._id.toString() !== commentId ? c : targetComment));

  // Save the updated post and comment author
  await post.save();
  await commentAuthor.save();

  res.status(201).end();
};

// Function for upvoting a reply
const upvoteReply = async (req, res) => {
  const { id, commentId, replyId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  // Check if the post exists
  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: 'User does not exist in the database.' });
  }

  const targetComment = post.comments.find((c) => c._id.toString() === commentId);

  // Check if the comment exists
  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}' does not exist in the database.`,
    });
  }

  const targetReply = targetComment.replies.find((r) => r._id.toString() === replyId);

  // Check if the reply exists
  if (!targetReply) {
    return res.status(404).send({
      message: `Reply comment with ID: '${replyId}' does not exist in the database.`,
    });
  }

  const replyAuthor = await User.findById(targetReply.repliedBy);

  // Check if the reply author exists
  if (!replyAuthor) {
    return res.status(404).send({ message: 'Reply author does not exist in the database.' });
  }

  if (targetReply.upvotedBy.includes(user._id.toString())) {
    // User has already upvoted the reply, remove their upvote
    targetReply.upvotedBy = targetReply.upvotedBy.filter((u) => u.toString() !== user._id.toString());

    // Decrease the reply author's comment karma
    replyAuthor.karmaPoints.commentKarma--;
  } else {
    // User hasn't upvoted the reply, add their upvote
    targetReply.upvotedBy = targetReply.upvotedBy.concat(user._id);
    targetReply.downvotedBy = targetReply.downvotedBy.filter((d) => d.toString() !== user._id.toString());

    // Increase the reply author's comment karma
    replyAuthor.karmaPoints.commentKarma++;
  }

  // Update the points count of the reply based on upvotes and downvotes
  targetReply.pointsCount = targetReply.upvotedBy.length - targetReply.downvotedBy.length;

  // Update the reply in the comment
  targetComment.replies = targetComment.replies.map((r) => (r._id.toString() !== replyId ? r : targetReply));

  // Update the comment in the post
  post.comments = post.comments.map((c) => (c._id.toString() !== commentId ? c : targetComment));

  // Save the updated post and reply author
  await post.save();
  await replyAuthor.save();

  res.status(201).end();
};

// Function for downvoting a reply
const downvoteReply = async (req, res) => {
  const { id, commentId, replyId } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  // Check if the post exists
  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in the database.`,
    });
  }

  // Check if the user exists
  if (!user) {
    return res.status(404).send({ message: 'User does not exist in the database.' });
  }

  const targetComment = post.comments.find((c) => c._id.toString() === commentId);

  // Check if the comment exists
  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}' does not exist in the database.`,
    });
  }

  const targetReply = targetComment.replies.find((r) => r._id.toString() === replyId);

  // Check if the reply exists
  if (!targetReply) {
    return res.status(404).send({
      message: `Reply comment with ID: '${replyId}' does not exist in the database.`,
    });
  }

  const replyAuthor = await User.findById(targetReply.repliedBy);

  // Check if the reply author exists
  if (!replyAuthor) {
    return res.status(404).send({ message: 'Reply author does not exist in the database.' });
  }

  if (targetReply.downvotedBy.includes(user._id.toString())) {
    // User has already downvoted the reply, remove their downvote
    targetReply.downvotedBy = targetReply.downvotedBy.filter((d) => d.toString() !== user._id.toString());

    // Increase the reply author's comment karma
    replyAuthor.karmaPoints.commentKarma++;
  } else {
    // User hasn't downvoted the reply, add their downvote
    targetReply.downvotedBy = targetReply.downvotedBy.concat(user._id);
    targetReply.upvotedBy = targetReply.upvotedBy.filter((u) => u.toString() !== user._id.toString());

    // Decrease the reply author's comment karma
    replyAuthor.karmaPoints.commentKarma--;
  }

  // Update the points count of the reply based on upvotes and downvotes
  targetReply.pointsCount = targetReply.upvotedBy.length - targetReply.downvotedBy.length;

  // Update the reply in the comment
  targetComment.replies = targetComment.replies.map((r) => (r._id.toString() !== replyId ? r : targetReply));

  // Update the comment in the post
  post.comments = post.comments.map((c) => (c._id.toString() !== commentId ? c : targetComment));

  // Save the updated post and reply author
  await post.save();
  await replyAuthor.save();

  res.status(201).end();
};

module.exports = {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
};
