export const SKETCH_CODE = `/* globals SVG */
import { SKETCH_CODE } from './sketchCodeStr.js';
import { placeCharacters } from './utils/textUtils.js';
import { addNoise, noisyLine, circleMask } from './utils/noiseUtils.js';

const textX = 128;
const textY = 81;
const textNoiseSize = 32;

const drawNoisyHorizontalLines = ({
  y0 = 0, initialStep = 1, stepGrowth = 1.015, mask = circleMask,
}) => {
  let currentStep = initialStep;
  for (let y = y0; y <= height && y >= 0; y += currentStep) {
    noisyLine(0, y, width, y, mask);
    currentStep *= stepGrowth;
  }
};

window.setup = () => {
  createCanvas(512, 662, SVG);

  noFill();
  strokeWeight(3);
  textSize(9);
};

window.draw = () => {
  stroke([30, 200, 100, 50]);
  drawNoisyHorizontalLines({ y0: 0, initialStep: 1 });

  stroke([30, 100, 200, 50]);
  drawNoisyHorizontalLines({ y0: height, initialStep: -1 });

  stroke(0);
  strokeWeight(1);
  placeCharacters(SKETCH_CODE).forEach(({ c, xOffset, yOffset }) => {
    const { x, y } = addNoise({
      x: textX + xOffset,
      y: textY + yOffset,
      nSize: map(yOffset, 0, height, 0, textNoiseSize),
    });

    text(c, x, y);
  });

  noLoop();
};
`;
