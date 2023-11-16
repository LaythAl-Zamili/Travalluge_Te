// Function that calculates pagination information based on the current page, limit, and total document count
const paginateResults = (page, limit, docCount) => {
  // Calculate the start and end indexes of the current page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Initialize an empty object to store the pagination metadata
  const results = {};

  // If there are more documents after the current page, add metadata for the next page
  if (endIndex < docCount) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  // If the current page is not the first page, add metadata for the previous page
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  // Return an object containing the start and end indexes of the current page,
  // as well as the pagination metadata
  return {
    startIndex,
    endIndex,
    results,
  };
};

// Exporting the paginateResults function to be used in other parts of the code
module.exports = paginateResults;
