/**
 * Will return random number between specified range.
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} random value
 */
export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
