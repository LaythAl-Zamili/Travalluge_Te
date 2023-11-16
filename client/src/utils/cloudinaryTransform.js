// Function to get the edited thumbnail URL by adding transformation parameters
const getEditedThumbnail = (imageLink) => {
  const splittedUrl = imageLink.split('image/upload/');
  const firstPart = splittedUrl[0];
  const secondPart = splittedUrl[1];
  const transformApi = 'w_70,h_90,c_fill,g_auto/';

  // Join the URL parts with the transformation API string
  return [firstPart, transformApi, secondPart].join('');
};

// Function to get a circular avatar URL by adding transformation parameters
export const getCircularAvatar = (imageLink) => {
  const splittedUrl = imageLink.split('image/upload/');
  const firstPart = splittedUrl[0];
  const secondPart = splittedUrl[1];
  const transformApi = 'w_200,h_200,c_fill,g_auto/';

  // Join the URL parts with the transformation API string
  return [firstPart, transformApi, secondPart].join('');
};

// Export the getEditedThumbnail function as the default export
export default getEditedThumbnail;
