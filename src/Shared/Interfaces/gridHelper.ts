import { Coordinate } from "./coordinate";

export class GridHelper {
  public static CreateGrid = (xLength: number, yLength: number): boolean[][] => {
    const grid = [];

    for(let i = 0; i < yLength; i++) {
      const gridRow = [];

      for(let k = 0; k < xLength; k++) {
        gridRow.push(this.getRandomBoolian());
      }

      grid.push(gridRow);
    }
    return grid;
  }

  public static setGridLights = (grid: boolean[][], coord: Coordinate): boolean[][]  => {
    const gridToReturn = grid;

    // Center
    gridToReturn[coord.y][coord.x] = !gridToReturn[coord.y][coord.x];

    // Up
    if (coord.y -1 >= 0)
      gridToReturn[coord.y -1][coord.x] = !gridToReturn[coord.y -1][coord.x];

    // Down
    if (coord.y +1 <= gridToReturn.length -1)
      gridToReturn[coord.y +1][coord.x] = !gridToReturn[coord.y +1][coord.x];

    // Left
    if (coord.x -1 >= 0)
      gridToReturn[coord.y][coord.x -1] = !gridToReturn[coord.y][coord.x -1];

    // Right
    if (coord.x +1 <= gridToReturn[0].length -1)
      gridToReturn[coord.y][coord.x +1] = !gridToReturn[coord.y][coord.x +1];

    return gridToReturn;
  }

  public static isGridLightValid = (grid: boolean[][]): boolean => {
    const isValid = !grid.some(y => y.some(x => !x));
    return isValid;
  }

  private static getRandomBoolian(): boolean {
    return Math.floor(Math.random() * 2) === 1;
  }
}