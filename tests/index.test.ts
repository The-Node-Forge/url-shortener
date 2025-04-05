import fs from 'fs';

import { URLShortener } from '../src';
import { FileStore } from '../src/stores/fileStore';
import { MockRedisStore } from './mocks/redisStore';

const TWO_SECONDS_MS = 2000;
const ONE_SECOND_STRING = '1s';
const MOCK_TTL = 100;
const ADVANCE_TIMER = 200;

describe('URLShortener (InMemoryStore)', () => {
  let shortener: URLShortener;

  beforeEach(() => {
    shortener = new URLShortener('https://sho.rt');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shortens and resolves a basic URL', async () => {
    const shortUrl = await shortener.shorten('https://google.com');
    const alias = shortUrl.split('/').pop()!;
    const resolved = await shortener.resolve(alias);
    expect(resolved).toBe('https://google.com');
  });

  it('respects custom alias', async () => {
    const shortUrl = await shortener.shorten('https://github.com', {
      alias: 'ghub',
    });
    expect(shortUrl).toBe('https://sho.rt/ghub');
    const resolved = await shortener.resolve('ghub');
    expect(resolved).toBe('https://github.com');
  });

  it('throws for invalid URL format', async () => {
    await expect(shortener.shorten('not-a-valid-url')).rejects.toThrow(
      'Invalid URL format.',
    );
  });

  it('returns null for unknown alias', async () => {
    const result = await shortener.resolve('nonexistent');
    expect(result).toBeNull();
  });

  it('expires URLs after the given TTL', async () => {
    await shortener.shorten('https://expired.com', {
      alias: 'temp',
      expiresIn: ONE_SECOND_STRING,
    });
    jest.advanceTimersByTime(TWO_SECONDS_MS);
    const expired = await shortener.resolve('temp');
    expect(expired).toBeNull();
  });

  it('throws if alias already exists', async () => {
    await shortener.shorten('https://first.com', { alias: 'dup' });
    await expect(
      shortener.shorten('https://second.com', { alias: 'dup' }),
    ).rejects.toThrow('Alias is already in use.');
  });
});

describe('URLShortener (FileStore)', () => {
  const filePath = './test-store.json';
  let shortener: URLShortener;

  beforeEach(() => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    shortener = new URLShortener('https://sho.rt', new FileStore(filePath));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });

  it('persists data to file and resolves correctly', async () => {
    const url = 'https://persisted.com';
    const alias = 'filetest';
    await shortener.shorten(url, { alias });
    const resolved = await shortener.resolve(alias);
    expect(resolved).toBe(url);
  });

  it('expires and removes expired URLs', async () => {
    await shortener.shorten('https://expired.com', {
      alias: 'dead',
      expiresIn: ONE_SECOND_STRING,
    });
    jest.advanceTimersByTime(TWO_SECONDS_MS);
    const result = await shortener.resolve('dead');
    expect(result).toBeNull();
  });
});

describe('URLShortener (MockRedisStore)', () => {
  let mockStore: MockRedisStore;
  let shortener: URLShortener;

  beforeEach(() => {
    // Use modern fake timers (casting to any to appease TS)
    jest.useFakeTimers('modern' as any);
    // Record the starting time (this is controlled by fake timers)
    mockStore = new MockRedisStore();
    shortener = new URLShortener('https://sho.rt', mockStore);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('works with MockRedisStore backend', async () => {
    const alias = 'mock-test';
    const url = 'https://example.com';
    const shortUrl = await shortener.shorten(url, { alias });
    expect(shortUrl).toBe(`https://sho.rt/${alias}`);

    const resolved = await shortener.resolve(alias);
    expect(resolved).toBe(url);
  });

  it('expires and removes entries in MockRedisStore', async () => {
    await shortener.shorten('https://expired.com', {
      alias: 'expire-test',
      expiresIn: `${MOCK_TTL}ms`,
    });
    // Advance timers by ADVANCE_TIMER (200ms) so that the TTL (100ms) should be expired.
    jest.advanceTimersByTime(ADVANCE_TIMER);
    // Flush any pending timers (the deletion callback) so that it runs immediately.
    jest.runAllTimers();
    // Await a tick to flush pending promise resolutions.
    await Promise.resolve();
    const expired = await shortener.resolve('expire-test');
    expect(expired).toBeNull();
  });
});
