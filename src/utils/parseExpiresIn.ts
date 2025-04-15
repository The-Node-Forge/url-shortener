/* eslint-disable space-before-function-paren */
/**
 * Parses a time string (e.g. "1h", "30m", "1h30m", "2h15m10s", "100ms")
 * into milliseconds. Throws an error if the format is invalid.
 *
 * Supported units:
 * - h: hours
 * - m: minutes
 * - s: seconds
 * - ms: milliseconds
 *
 * @param value A string or number representing a duration.
 * @returns The duration in milliseconds.
 */
export function parseExpiresIn(value: string | number): number {
  // If value is already a number, return it directly.
  if (typeof value === 'number') return value;

  // Constants for conversion factors.
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = SECONDS_IN_MINUTE * MS_PER_SECOND;
  const MS_PER_HOUR = MINUTES_IN_HOUR * MS_PER_MINUTE;
  const MS_PER_DAY = HOURS_IN_DAY * MS_PER_HOUR;

  if (typeof value === 'string') {
    // Regular expression to capture numbers (including decimals)
    // followed by valid time units.
    const regex = /(\d+(?:\.\d+)?)(ms|s|m|h|d)/g;
    let totalMilliseconds = 0;
    let match: RegExpExecArray | null;

    // Iterate over all matches and convert each to milliseconds.
    while ((match = regex.exec(value)) !== null) {
      const [, amountStr, unit] = match; // Destructure the match array
      const amount = parseFloat(amountStr);

      switch (unit) {
        case 'ms':
          totalMilliseconds += amount;
          break;
        case 's':
          totalMilliseconds += amount * MS_PER_SECOND;
          break;
        case 'm':
          totalMilliseconds += amount * MS_PER_MINUTE;
          break;
        case 'h':
          totalMilliseconds += amount * MS_PER_HOUR;
          break;
        case 'd':
          totalMilliseconds += amount * MS_PER_DAY;
          break;
        default:
          throw new Error('Invalid expiresIn format');
      }
    }

    // If at least one valid duration segment was found, return the total.
    if (totalMilliseconds > 0) {
      return totalMilliseconds;
    }
  }

  // If no valid segments were found or the format is unsupported, throw an error.
  throw new Error('Invalid expiresIn format');
}
