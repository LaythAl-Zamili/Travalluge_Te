const User = require('../models/user');
const Post = require('../models/post');
const { cloudinary, UPLOAD_PRESET } = require('../utils/config');
const paginateResults = require('../utils/paginateResults');

// Get user details and their posts
const getUser = async (req, res) => {
  const { username } = req.params;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  // Find the user by username
  const user = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  if (!user) {
    return res
      .status(404)
      .send({ message: `Username '${username}' does not exist on server.` });
  }

  // Count the total number of posts by the user
  const postsCount = await Post.find({ author: user.id }).countDocuments();

  // Paginate the results based on the requested page and limit
  const paginated = paginateResults(page, limit, postsCount);

  // Fetch the user's posts, sorted by createdAt in descending order
  const userPosts = await Post.find({ author: user.id })
    .sort({ createdAt: -1 })
    .select('-comments') // Exclude comments from the response
    .limit(limit)
    .skip(paginated.startIndex)
    .populate('author', 'username') // Populate the author field with username only
    .populate('subreddit', 'subredditName'); // Populate the subreddit field with subredditName only

  const paginatedPosts = {
    previous: paginated.results.previous,
    results: userPosts,
    next: paginated.results.next,
  };

  res.status(200).json({ userDetails: user, posts: paginatedPosts });
};

// Set user avatar image
const setUserAvatar = async (req, res) => {
  const { avatarImage } = req.body;

  if (!avatarImage) {
    return res
      .status(400)
      .send({ message: 'Image URL needed for setting avatar.' });
  }

  // Find the user by ID
  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  // Upload the avatar image to Cloudinary
  const uploadedImage = await cloudinary.uploader.upload(
    avatarImage,
    {
      upload_preset: UPLOAD_PRESET,
    },
    (error) => {
      if (error) return res.status(401).send({ message: error.message });
    }
  );

  // Update the user's avatar details
  user.avatar = {
    exists: true,
    imageLink: uploadedImage.url,
    imageId: uploadedImage.public_id,
  };

  const savedUser = await user.save();
  res.status(201).json({ avatar: savedUser.avatar });
};

// Remove user avatar
const removeUserAvatar = async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  // Reset the user's avatar details
  user.avatar = {
    exists: false,
    imageLink: 'null',
    imageId: 'null',
  };

  await user.save();
  res.status(204).end();
};

module.exports = { getUser, setUserAvatar, removeUserAvatar };
