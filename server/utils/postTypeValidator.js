// Importing the validator module for URL validation
const validator = require('validator');

// Function that validates and parses a text submission
const parseTextSubmission = (textSubmission) => {
  // Throw an error if the textSubmission is falsy (empty or undefined)
  if (!textSubmission) {
    throw new Error(`Text body needed for post type 'Text'.`);
  }
  return textSubmission;
};

// Function that validates and parses a link submission
const parseLinkSubmission = (linkSubmission) => {
  // Throw an error if the linkSubmission is falsy or is not a valid URL
  if (!linkSubmission || !validator.isURL(linkSubmission)) {
    throw new Error(`Valid URL needed for post type 'Link'.`);
  }
  return linkSubmission;
};

// Function that validates and parses an image submission
const parseImageSubmission = (imageSubmission) => {
  // Throw an error if the imageSubmission is falsy (empty or undefined)
  if (!imageSubmission) {
    throw new Error(`Image is needed for type 'Image'.`);
  }
  return imageSubmission;
};

// Function that validates and parses the post type and corresponding submission
const postTypeValidator = (type, text, link, image) => {
  // Perform different validation and parsing based on the post type
  switch (type) {
    case 'Text':
      return {
        postType: 'Text',
        textSubmission: parseTextSubmission(text),
      };

    case 'Link':
      return {
        postType: 'Link',
        linkSubmission: parseLinkSubmission(link),
      };

    case 'Image':
      return {
        postType: 'Image',
        imageSubmission: parseImageSubmission(image),
      };

    default:
      throw new Error(
        'Invalid post type. Valid types include - Text, Link, or Image.'
      );
  }
};

// Exporting the postTypeValidator function to be used in other parts of the code
module.exports = postTypeValidator;
