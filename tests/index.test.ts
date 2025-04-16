import { URLShortener } from '../src';
import { MockRedisStore } from './mocks/redisStore';

const MOCK_TTL = 100;
const ADVANCE_TIMER = 200;

describe('URLShortener (MockRedisStore)', () => {
  let mockStore: MockRedisStore;
  let shortener: URLShortener;

  beforeEach(() => {
    // Use modern fake timers (casting to never to appease TS)
    jest.useFakeTimers('modern' as never);
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
