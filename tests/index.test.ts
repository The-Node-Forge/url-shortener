import { URLShortener } from '../src';

describe('URLShortener', () => {
  let shortener: URLShortener;

  beforeEach(() => {
    // Initialize a new URLShortener instance before each test.
    shortener = new URLShortener('https://test.local');
  });

  it('should shorten and resolve a valid URL', async () => {
    const longUrl = 'https://nodeforge.dev/tools';
    const alias = 'tools';

    // Shorten the URL with a specific alias.
    const shortUrl = await shortener.shorten(longUrl, { alias });
    expect(shortUrl).toBe(`https://test.local/${alias}`);

    // Resolve the alias to get the original URL.
    const resolved = await shortener.resolve(alias);
    expect(resolved).toBe(longUrl);
  });

  it('should throw an error for invalid URLs', async () => {
    // Expect the promise to be rejected with the invalid URL error.
    await expect(shortener.shorten('not-a-valid-url')).rejects.toThrow(
      'Invalid URL format.',
    );
  });

  it('should return null for unknown alias', async () => {
    const result = await shortener.resolve('nonexistent');
    expect(result).toBeNull();
  });

  it('should return null for expired alias', async () => {
    const alias = 'temp';
    const expiresIn = '1s';
    const delayAfterExpirationMs = 2000;

    // Create a URL with an expiration of 1 second.
    await shortener.shorten('https://expired.com', { alias, expiresIn });

    // Use fake timers to simulate time passing.
    jest.useFakeTimers();
    jest.advanceTimersByTime(delayAfterExpirationMs);

    // Since our operations are asynchronous, we await the result.
    const result = await shortener.resolve(alias);
    expect(result).toBeNull();

    // Restore the real timers.
    jest.useRealTimers();
  });

  it('should throw an error if alias is reused', async () => {
    const alias = 'used';

    // Shorten the first URL using the alias.
    await shortener.shorten('https://first.com', { alias });

    // Expect the second shorten operation with the same alias to be rejected.
    await expect(shortener.shorten('https://second.com', { alias })).rejects.toThrow(
      'Alias is already in use.',
    );
  });
});
