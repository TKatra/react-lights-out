import { Setup } from "./Interfaces/gameSetup";

export class MiscHelper {
  public static NumberLimiter = (number: number, minValue: number, maxValue: number): number => {
    // Fix for when number is NaN
    number = number || 0;

    if (number < minValue) return minValue;
    if (number > maxValue) return maxValue;

    return number;
  }

  public static validateSetup = (setup: Setup) => {
    if (setup.playerName === '') {
      return false;
    }

    return true;
  }

  public static deepCopy = (objectToCopy: any) => {
    return JSON.parse(JSON.stringify(objectToCopy))
  }
}