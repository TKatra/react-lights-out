export class Helpers {
  public static NumberLimiter = (number: number, minValue: number, maxValue: number): number => {
    // Fix for when number is NaN
    number = number || 0;

    if (number < minValue) return minValue;
    if (number > maxValue) return maxValue;

    return number;
  }
}