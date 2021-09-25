const TAB_CHAR = '  ';
const TAB_REPLACE = '    ';

const breakIntoLines = (txt, lineSpacing = 1.2) => {
  const yStep = textSize() * lineSpacing;
  const txtLines = txt.split('\n');

  const lines = txtLines.map((s, i) => {
    const y = yStep * i;
    return { txt: s, yOffset: y };
  });

  return lines;
};

const breakIntoChars = (
  txt, charSpacing = 1.1, tabChar = TAB_CHAR, tabReplace = TAB_REPLACE,
) => {
  const txtChars = txt.replace(tabChar, tabReplace).split('');

  let currX = 0;
  const chars = txtChars.map((s) => {
    const x = currX;
    currX += textWidth(s) * charSpacing;

    return { txt: s, xOffset: x };
  });

  return chars;
};

/**
 * Split text into individual characters and position these chars on (x, y) canvas
 * 
 * @param {String} txt string to process
 * @param {Number} lineSpacing a scaler for line spacing; default is 1.2 (120% of `textSize()`)
 * @param {Number} charSpacing a scaler for char spacing; default is 1.1 (110% of `textWidth()`)
 * @param {String} tabChar used in a string.replace() to customize tab appearance (use '' to turn off)
 * @param {String} tabReplace used in a string.replace() to customize tab appearance
 * @returns an array of custom character objects: {c, xOffset, yOffset}
 */
export const placeCharacters = (
  txt, lineSpacing = 1.2, charSpacing = 1.1, tabChar = TAB_CHAR, tabReplace = TAB_REPLACE,
) => {
  const lines = breakIntoLines(txt, lineSpacing);

  const placedCharacters = [];
  lines.forEach(({ txt: t, yOffset }) => {
    const chars = breakIntoChars(t, charSpacing, tabChar, tabReplace);

    chars.forEach(({ txt: c, xOffset }) => {
      const placedCharacter = { c, xOffset, yOffset };
      placedCharacters.push(placedCharacter);
    });
  });

  return placedCharacters;
};
