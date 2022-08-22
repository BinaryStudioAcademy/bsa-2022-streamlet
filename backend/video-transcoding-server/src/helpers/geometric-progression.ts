export const geometricProgressionByIndex = (step: number, index: number, start = 0): number =>
  start * Math.pow(step, index);
