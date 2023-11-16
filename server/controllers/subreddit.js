const Subreddit = require('../models/subreddit');
const User = require('../models/user');
const Post = require('../models/post');

const paginateResults = require('../utils/paginateResults');

// Get all subreddits
const getSubreddits = async (_req, res) => {
  const allSubreddits = await Subreddit.find({}).select('id subredditName');
  res.status(200).json(allSubreddits);
};

// Get posts from a specific subreddit
const getSubredditPosts = async (req, res) => {
  const { subredditName } = req.params;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const sortBy = req.query.sortby;

  let sortQuery;
  switch (sortBy) {
    case 'new':
      sortQuery = { createdAt: -1 };
      break;
    case 'top':
      sortQuery = { pointsCount: -1 };
      break;
    case 'best':
      sortQuery = { voteRatio: -1 };
      break;
    case 'hot':
      sortQuery = { hotAlgo: -1 };
      break;
    case 'controversial':
      sortQuery = { controversialAlgo: -1 };
      break;
    case 'old':
      sortQuery = { createdAt: 1 };
      break;
    default:
      sortQuery = {};
  }

  // Find the subreddit by name (case-insensitive)
  const subreddit = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  }).populate('admin', 'username');

  if (!subreddit) {
    return res.status(404).send({
      message: `Subreddit '${subredditName}' does not exist on the server.`,
    });
  }

  // Count the total number of posts in the subreddit
  const postsCount = await Post.find({
    subreddit: subreddit.id,
  }).countDocuments();

  // Paginate the results based on the provided page and limit parameters
  const paginated = paginateResults(page, limit, postsCount);

  // Fetch the posts from the subreddit with sorting, pagination, and population
  const subredditPosts = await Post.find({ subreddit: subreddit.id })
    .sort(sortQuery)
    .select('-comments')
    .limit(limit)
    .skip(paginated.startIndex)
    .populate('author', 'username')
    .populate('subreddit', 'subredditName');

  // Construct the paginated posts object
  const paginatedPosts = {
    previous: paginated.results.previous,
    results: subredditPosts,
    next: paginated.results.next,
  };

  res.status(200).json({ subDetails: subreddit, posts: paginatedPosts });
};

// Get top 10 subreddits based on subscriber count
const getTopSubreddits = async (_req, res) => {
  const top10Subreddits = await Subreddit.find({})
    .sort({ subscriberCount: -1 })
    .limit(10)
    .select('-description -posts -admin ');

  res.status(200).json(top10Subreddits);
};

// Create a new subreddit
const createNewSubreddit = async (req, res) => {
  const { subredditName, description } = req.body;

  // Find the admin user by ID
  const admin = await User.findById(req.user);
  if (!admin) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  // Check if the subreddit name already exists
  const existingSubName = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  });

  if (existingSubName) {
    return res.status(403).send({
      message: `Destination with the same name "${subredditName}" already exists. Please choose another name.`,
    });
  }

  // Create a new subreddit object
  const newSubreddit = new Subreddit({
    subredditName,
    description,
    admin: admin._id,
    subscribedBy: [admin._id],
    subscriberCount: 1,
  });

  const savedSubreddit = await newSubreddit.save();

  // Update the admin user's subscribed subreddits
  admin.subscribedSubs = admin.subscribedSubs.concat(savedSubreddit._id);
  await admin.save();

  return res.status(201).json(savedSubreddit);
};

// Edit the description of a subreddit
const editSubDescription = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  if (!description) {
    return res
      .status(400)
      .send({ message: `Description body cannot be empty.` });
  }

  // Find the admin user and the subreddit
  const admin = await User.findById(req.user);
  const subreddit = await Subreddit.findById(id);

  if (!admin) {
    return res
      .status(404)
      .send({ message: 'User does not exist in the database.' });
  }

  if (!subreddit) {
    return res.status(404).send({
      message: `Destination with ID: ${id} does not exist in the database.`,
    });
  }

  // Check if the user is the admin of the subreddit
  if (subreddit.admin.toString() !== admin._id.toString()) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  // Update the subreddit description
  subreddit.description = description;

  await subreddit.save();
  res.status(202).end();
};

// Subscribe/unsubscribe to a subreddit
const subscribeToSubreddit = async (req, res) => {
  const { id } = req.params;

  const subreddit = await Subreddit.findById(id);
  const user = await User.findById(req.user);

  if (subreddit.subscribedBy.includes(user._id.toString())) {
    // User is already subscribed, unsubscribe
    subreddit.subscribedBy = subreddit.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );

    user.subscribedSubs = user.subscribedSubs.filter(
      (s) => s.toString() !== subreddit._id.toString()
    );
  } else {
    // User is not subscribed, subscribe
    subreddit.subscribedBy = subreddit.subscribedBy.concat(user._id);

    user.subscribedSubs = user.subscribedSubs.concat(subreddit._id);
  }

  subreddit.subscriberCount = subreddit.subscribedBy.length;

  await subreddit.save();
  await user.save();

  res.status(201).end();
};

module.exports = {
  getSubreddits,
  getSubredditPosts,
  getTopSubreddits,
  createNewSubreddit,
  editSubDescription,
  subscribeToSubreddit,
};
