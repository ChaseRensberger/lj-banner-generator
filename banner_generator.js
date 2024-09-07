import sharp from "sharp";
import { createCanvas, loadImage, registerFont } from 'canvas';

const args = process.argv.slice(2);

function drawRoundedRect(ctx, x, y, width, height, borderRadius, leftOnly = false) {
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + width - borderRadius, y);
  if (leftOnly) {
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width - borderRadius, y + height);
  } else {
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
  }
  ctx.lineTo(x + borderRadius, y + height);
  // bottom left
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  // top left
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.closePath();
  ctx.fill();
}

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

    ctx.font = '50px CustomFont';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const progressBarHeight = 80;
    const progressBarWidth = 1050;
    const filledWidth = progressBarWidth * (progressPercentage / 100);
    const progressBarX = ((imageWidth - progressBarWidth) / 2) - 170;
    const progressBarY = imageHeight - 750;
    const borderRadius = 10;

    const textX = (imageWidth / 2) - 135;
    const textY = progressBarY + 125;

    ctx.fillText(text, textX, textY);

    // Draw empty progress bar
    ctx.fillStyle = 'white';
    drawRoundedRect(ctx, progressBarX, progressBarY, progressBarWidth, progressBarHeight, borderRadius);

    // Draw filled progress bar
    ctx.fillStyle = '#88DF68';
    drawRoundedRect(ctx, progressBarX, progressBarY, filledWidth, progressBarHeight, borderRadius, true);

    const buffer = canvas.toBuffer('image/jpeg');
    const result = await sharp(buffer).toFile(outputFilename);

    return result;
  } catch (error) {
    throw error;
  }
}

const inputPath = "input_banner.jpeg";
const fontPath = "/app/Arial.ttf";
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
