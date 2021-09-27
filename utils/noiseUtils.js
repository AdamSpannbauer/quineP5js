/* eslint-disable no-param-reassign */

/**
 * Add perlin noise to an input point
 *
 * @param {Object} options noise inputs and options
 * @param {Number} options.x x position of input point
 * @param {Number} options.y y position of input point
 * @param {Number} options.nScl scale of noise grid for sampling
 *                              (smaller numbers -> smoother; higher numbers -> more eradic)
 * @param {Number} options.nSize size of noise applied to x and y; noise will
 *                               be in range [-nSize, nSize]
 * @returns an {x, y} object containing the result of adding noise to input x & y
 */
export const addNoise = ({
  x, y, nScl = 0.01, nSize = 20,
}) => {
  const nx = noise(x * nScl, y * nScl, frameCount * 0.001);
  const ny = noise(x * nScl, y * nScl, 42 + frameCount * 0.001);

  const dx = map(nx, 0, 1, -nSize, nSize);
  const dy = map(ny, 0, 1, -nSize, nSize);

  return { x: x + dx, y: y + dy };
};

/**
 * Check if a point is inside of a given circle
 *
 * @param {Object} pt {x, y} point to check if in a circle
 * @param {Number} cx circle center's x coord
 * @param {Number} cy circle center's y coord
 * @param {Number} cr circle's radius
 * @returns true if {x, y} lies within circle; otherwise false
 */
export const circleMask = ({ x, y }, cx = null, cy = null, r = 200) => {
  cx = cx === null ? width / 2 : cx;
  cy = cy === null ? height / 2 : cy;

  const sqD = (x - cx) ** 2 + (y - cy) ** 2;
  return sqD < r ** 2;
};

/**
 * Draw a line with vertices affected by perlin noise (w/optional masking)
 *
 * @param {Number} x1 line start x coord
 * @param {Number} y1 line start y coord
 * @param {Number} x2 line end x coord
 * @param {Number} y2 line end y coord
 * @param {Function} maskFunc optional test function to mask vertices
 *                            function must accept {x, y} object as input
 *                            and return truthy if point should be drawn.
 * @param {Number} nScl scale of noise grid for sampling
 *                              (smaller numbers -> smoother; higher numbers -> more eradic)
 * @param {Number} nSize size of noise applied to x and y; noise will
 *                               be in range [-nSize, nSize]
 * @param {Number} nSteps integer indicating number of vertices to use in line
 */
export const noisyLine = (
  x1, y1, x2, y2, maskFunc = testPtInCircle, nScl = 0.01, nSize = 30, nSteps = null,
) => {
  nSteps = nSteps === null ? width : nSteps;

  let drawing = false;
  for (let i = 0; i < nSteps; i += 1) {
    const xi = map(i, 0, nSteps - 1, x1, x2);
    const yi = map(i, 0, nSteps - 1, y1, y2);

    const { y } = addNoise({
      x: xi, y: yi, nScl, nSize: map(yi, 0, height, 0, nSize),
    });

    let drawPoint = true;
    if (maskFunc) drawPoint = maskFunc({ x: xi, y });

    if (!drawPoint) {
      if (drawing) endShape();
      drawing = false;
    } else {
      if (!drawing) beginShape();
      vertex(xi, y);
      drawing = true;
    }
  }
  if (drawing) endShape();
};
