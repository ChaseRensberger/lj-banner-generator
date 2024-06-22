import sharp from "sharp";
import TextToSVG from "text-to-svg";
import SVGToJpeg from "convert-svg-to-jpeg";

const args = process.argv.slice(2);

async function addTextToImage(
  inputPath,
  text,
  fontPath,
  progressPercentage,
  outputFilename
) {
  try {
    const textToSVG = TextToSVG.loadSync(fontPath);
    const svgText = textToSVG.getSVG(text, {
      x: 0,
      y: 0,
      fontSize: 48,
      anchor: "top",
      attributes: { fill: "white" },
    });

    const image = sharp(inputPath);

    const progressBarHeight = 80;
    const progressBarWidth = 1050;
    const filledWidth = progressBarWidth * (progressPercentage / 100);
    const rxry = 0; // border radius

    const progressBarEmptySVG = `<rect width="${progressBarWidth}" height="${progressBarHeight}" fill="white" rx="${rxry}" ry="${rxry}"/>`;
    const progressBarFilledSVG = `<rect width="${filledWidth}" height="${progressBarHeight}" fill="#88DF68" rx="${rxry}" ry="${rxry}"/>`;
    const progressBarSVG = `<svg width="${progressBarWidth}" height="${progressBarHeight}">${progressBarEmptySVG}${progressBarFilledSVG}</svg>`;
    const progressBarJpeg = await SVGToJpeg.convert(progressBarSVG);
    const result = await image
      .composite([
        { input: Buffer.from(progressBarJpeg), top: 700, left: 582 },
        {
          input: Buffer.from(svgText),
          top: 800,
          left: 860,
        },
      ])
      .toFile(outputFilename);
    //   .toBuffer(); // Convert the processed image to a buffer instead of saving it to a file

    console.log("File created successfully");

    return result;
  } catch (error) {
    throw error;
  }
}

const inputPath = "input_banner.jpeg";
const fontPath = "Arial.ttf";
const currentSubscribersCount = args[0];
const target = args[1];
const subscriberDifference = target - currentSubscribersCount;

const text = `${subscriberDifference} subscribers to go!`;
const outputFilename = `output_banner.jpeg`;
await addTextToImage(
  inputPath,
  text,
  fontPath,
  ((target - currentSubscribersCount) / target) * 100,
  outputFilename
);
