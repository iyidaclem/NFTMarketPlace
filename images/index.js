// Import all images from the 'images' directory
const images = require.context('./', false, /\.png$/);

// Create an array of image paths
const imagePaths = [];
images.keys().forEach((path) => {
  imagePaths.push(images(path));
});

export {
  imagePaths,
};
