import { SetupState } from "./Interfaces/State/setupState";

export class MiscHelper {
  public static NumberLimiter = (number: number, minValue: number, maxValue: number): number => {
    // Fix for when number is NaN
    number = number || 0;

    if (number < minValue) return minValue;
    if (number > maxValue) return maxValue;

    return number;
  }

  public static validateSetup = (setup: SetupState) => {
    if (setup.playerName === '') {
      return false;
    }

    return true;
  }

  public static deepCopy = (objectToCopy: any) => {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  public static timerToString = (start: number, end: number, showMilliseconds?: boolean): string => {
    const timer = this.removeDateTimezoneOffset(new Date(end - start));
    const hours = timer.getHours() ? timer.getHours() + ':' : '';
    const milliseconds = showMilliseconds ? ':' + timer.getMilliseconds() : '';

    return `${hours}${timer.getMinutes()}:${timer.getSeconds()}${milliseconds}`;
  }

  public static removeDateTimezoneOffset = (date: Date): Date => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }
}