/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-magic-numbers */
/* utils/parseExpiresIn.ts */
/**
 * Parses a time string (e.g. "1h", "30m", "1h30m") into milliseconds.
 * Throws an error if the format is invalid.
 */
export function parseExpiresIn(input: string): number {
  const timePattern = /([0-9]+)([smhd])/g;
  const units: Record<string, number> = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
  };

  let total = 0;
  let match: RegExpExecArray | null;

  try {
    while ((match = timePattern.exec(input)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2];
      total += value * units[unit];
    }
  } catch (error) {
    console.error('Error parsing expiresIn string:', error);
    throw new Error(
      'Invalid expiresIn format. Use "1h", "30m", or combinations like "1h30m".',
    );
  }

  if (total === 0) {
    throw new Error(
      'Invalid expiresIn format. Use "1h", "30m", or combinations like "1h30m".',
    );
  }

  return total;
}
