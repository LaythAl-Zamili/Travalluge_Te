// Function to trim a link URL and add ellipsis if it exceeds the character limit
export const trimLink = (link, charLimit) => {
  return link.length < charLimit
    ? link
    : link.slice(0, charLimit).concat('...');
};

// Function to prettify a link URL by removing the protocol (http or https)
export const prettifyLink = (link) => {
  return link.startsWith('http') ? link.split('//')[1] : link;
};

// Function to fix a link URL by adding the 'https://' protocol if missing
export const fixUrl = (link) => {
  return link.startsWith('http') ? link : 'https://'.concat(link);
};
