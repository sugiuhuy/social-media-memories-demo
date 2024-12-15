/**
 * Generates a random color
 *
 * @example
 * await getRandomColor()
 */
function getRandomColor(): string {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    // Generates a random number between 0 and 15
    // and converts it to a hexadecimal string
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

/**
 * Generates a random color that is not white or black
 *
 * @example
 * await getRandomNonWhiteColor()
 */
function getRandomNonWhiteColor(): string {
  /**
   * List of colors that are excluded from being generated
   * @type {Array<string>}
   */
  const excludeColors = [
    "#ffffff",
    "#000000",
    "#fafafa",
    "#f5f5f5",
    "#e5e5e5",
    "#d4d4d4",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
    "#0a0a0a",
  ];

  /**
   * Generates a random color and checks if it is in the excluded list
   * If it is, it generates a new random color until it is not excluded
   * @returns {string} The generated color
   */
  let color;
  do {
    color = getRandomColor();
  } while (excludeColors.includes(color.toLowerCase()));
  return color;
}

/**
 * Generates a random color
 *
 * @example
 * await generateColor()
 * @returns {string} The generated color
 */
export default function generateColor(): string {
  const num = parseInt(getRandomNonWhiteColor().slice(1), 16);
  const amt = Math.round(2.55 * 5);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  const newColor =
    "#" +
    (
      0x1000000 +
      (R > 255 ? 255 : R < 1 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 1 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 1 ? 0 : B)
    )
      .toString(16)
      .slice(1);

  return newColor;
}
