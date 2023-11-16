// Function that calculates the total number of comments in an array
const numOfComments = (commentsArray) => {
  // Calculate the total number of replies by mapping each comment to the length of its replies array,
  // and then reducing the array of reply lengths to a single sum value
  const numOfReplies = commentsArray
    .map((c) => c.replies.length)
    .reduce((sum, c) => sum + c, 0);

  // Return the sum of the number of top-level comments and the number of replies
  return commentsArray.length + numOfReplies;
};

// Exporting the numOfComments function to be used in other parts of the code
module.exports = numOfComments;
