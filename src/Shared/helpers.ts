export class Helpers {
  public static NumberLimiter = (number: number, minValue: number, maxValue: number): number => {
    // Fix for when number is NaN
    number = number || 0;

    if (number < minValue) return minValue;
    if (number > maxValue) return maxValue;

    return number;
  }

  public static CreateGrid = (xLength: number, yLength: number): boolean[][] => {
    const grid = [];

    for(let i = 0; i < yLength; i++) {
      const gridRow = [];

      for(let k = 0; k < xLength; k++) {
        gridRow.push(false);
      }

      grid.push(gridRow);
    }
    return grid;
  }
}