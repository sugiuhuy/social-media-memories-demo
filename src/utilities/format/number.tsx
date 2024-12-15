/**
 * Format a number into a string with appropriate suffixes for thousands, millions or billions.
 *
 * @example
 * formatNumber(1000); // output: "1k"
 * formatNumber(1000000); // output: "1m"
 * formatNumber(1000000000); // output: "1b"
 */
export function formatNumber(number: number) {
  // If the number is a billion or larger, append "b" to the string.
  if (number >= 1e9) return (number / 1e9).toFixed(1) + "b";
  // If the number is a million or larger, append "m" to the string.
  if (number >= 1e6) return (number / 1e6).toFixed(1) + "m";
  // If the number is a thousand or larger, append "k" to the string.
  if (number >= 1e3) return (number / 1e3).toFixed(1) + "k";
  // Otherwise, just return the number as a string.
  return number.toString();
}
