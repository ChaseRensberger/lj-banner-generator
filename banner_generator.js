import sharp from "sharp";
import { createCanvas, loadImage, registerFont } from 'canvas';

const args = process.argv.slice(2);

async function addTextToImage(
  inputPath,
  text,
  fontPath,
  progressPercentage,
  outputFilename
) {
  try {

    const inputImage = await loadImage(inputPath);
    const imageWidth = inputImage.width;
    const imageHeight = inputImage.height;

    const canvas = createCanvas(imageWidth, imageHeight);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(inputImage, 0, 0, imageWidth, imageHeight);

    registerFont(fontPath, { family: 'CustomFont' });

    ctx.font = '40px CustomFont';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textX = imageWidth / 2;
    const textY = imageHeight - 100;

    ctx.fillText(text, textX, textY);

    const progressBarHeight = 80;
    const progressBarWidth = 1050;
    const filledWidth = progressBarWidth * (progressPercentage / 100);
    const progressBarX = (imageWidth - progressBarWidth) / 2;
    const progressBarY = imageHeight - 200;
    // const rxry = 0; // border radius

    // Draw empty progress bar
    ctx.fillStyle = 'white';
    ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

    // Draw filled progress bar
    ctx.fillStyle = '#88DF68';
    ctx.fillRect(progressBarX, progressBarY, filledWidth, progressBarHeight);

    const buffer = canvas.toBuffer('image/jpeg');
    const result = await sharp(buffer).toFile(outputFilename);

    return result;
  } catch (error) {
    throw error;
  }
}

const inputPath = "input_banner.jpeg";
const fontPath = "Arial.ttf";
const currentSubscribersCount = args[0];
const target = args[1];
const subscriberDifference = (target - currentSubscribersCount) + Math.floor(Math.random() * 11) - 5;
const completionPercentage = (currentSubscribersCount / target) * 100;

const text = `${subscriberDifference} subscribers to go!`;
const outputFilename = `output_banner.jpeg`;
await addTextToImage(
  inputPath,
  text,
  fontPath,
  completionPercentage,
  outputFilename
);
