/**
 * Slices a given string to a specified maximum length and appends '...' if the string is longer than the specified maximum length.
 * @param {string} txt - The input string to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced string. Defaults to 50 if not provided.
 * @returns {string} The sliced string. If the length of the input string is greater than or equal to the specified maximum length, it appends '...' at the end; otherwise, it returns the original string.
 */
export function txtSlicer(txt: string, max: number = 50): string {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
}
