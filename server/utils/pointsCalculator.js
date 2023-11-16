// Function that calculates points, vote ratio, hot algorithm score, and controversial algorithm score
const pointsCalculator = (upvotes, downvotes, createdDate) => {
  // Initialize an empty object to store the calculated values
  const result = {};

  // Calculate the points as the difference between upvotes and downvotes
  const points = upvotes - downvotes;

  // Set the pointsCount to 0 if the points are less than or equal to 0, otherwise set it to the calculated points
  if (points <= 0) {
    result.pointsCount = 0;
  } else {
    result.pointsCount = points;
  }

  // Calculate the vote ratio as the ratio of upvotes to downvotes
  const voteRatio = upvotes / downvotes;

  // Set the voteRatio to 1 if it is not a finite value (e.g., division by zero), otherwise set it to the calculated vote ratio
  if (!isFinite(voteRatio)) {
    result.voteRatio = 1;
  } else {
    result.voteRatio = voteRatio;
  }

  // Calculate the hot algorithm score using a logarithmic function and the created date
  result.hotAlgo =
    Math.log(Math.max(Math.abs(upvotes - downvotes), 1)) + createdDate / 4500;

  // Calculate the controversial algorithm score as the ratio of total votes to the absolute difference between upvotes and downvotes
  result.controversialAlgo =
    (upvotes + downvotes) / Math.max(Math.abs(upvotes - downvotes), 1);

  // Return the calculated values in the result object
  return result;
};

// Exporting the pointsCalculator function to be used in other parts of the code
module.exports = pointsCalculator;
