const { Configuration, OpenAIApi } = require('openai');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('cross-fetch');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const imageUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const base64Body = (await response.buffer()).toString('base64');
  return base64Body;
};
// const dataURLtoBlob = async (dataURL) => fetch(dataURL, {
//   method: 'GET',
//   headers: {
//     authorization: `Bearer ${process.env.OPENAI_API_KEY}` } })
//   .then((response) => response.blob())
//   .then((blob) => blob)
//   .catch((error) => {
//     console.error(`Error downloading image from URL: ${error}`);
//   });

export default async function generateImage(req, res) {
  const { prompt, size } = req.body;

  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = await imageUrlToBase64(response.data.data[0].url);
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
}

