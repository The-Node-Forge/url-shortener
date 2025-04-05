/* eslint-disable no-magic-numbers */
/* eslint-disable space-before-function-paren */
// urlShortener.ts
import { ShortenOptions, StoreAdapter } from '../types/types';
import { parseExpiresIn } from '../utils/parseExpiresIn';
import { InMemoryStore } from '../stores/inMemoryStore';

/**
 * URLShortener provides methods to shorten URLs and resolve aliases.
 * All methods are asynchronous and include robust error handling.
 */
export class URLShortener {
  private readonly baseDomain: string;
  private readonly store: StoreAdapter;

  private static readonly DEFAULT_CODE_LENGTH = 6;
  private static readonly CHAR_SET =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  constructor(
    baseDomain = 'https://sho.rt',
    store: StoreAdapter = new InMemoryStore(),
  ) {
    this.baseDomain = baseDomain;
    this.store = store;
  }

  /**
   * Shortens a long URL into a short one.
   * Validates the URL, ensures alias uniqueness, parses TTL, and stores the mapping.
   * @returns A Promise that resolves to the shortened URL string.
   */
  async shorten(longUrl: string, options?: ShortenOptions): Promise<string> {
    // Validate URL format
    if (!this.isValidUrl(longUrl)) {
      throw new Error('Invalid URL format.');
    }

    // Generate alias if not provided
    let alias =
      options?.alias ?? this.generateCode(URLShortener.DEFAULT_CODE_LENGTH);

    // Check if alias already exists; if provided explicitly, throw an error.
    if (await this.store.has(alias)) {
      if (options?.alias) {
        throw new Error('Alias is already in use.');
      }
      // Auto-generate a unique alias if needed.
      do {
        alias = this.generateCode(URLShortener.DEFAULT_CODE_LENGTH);
      } while (await this.store.has(alias));
    }

    let expiresAt: number | undefined = undefined;
    try {
      // Parse expiresIn string if provided
      expiresAt = options?.expiresIn
        ? Date.now() + parseExpiresIn(options.expiresIn)
        : undefined;
    } catch (error) {
      console.error('Error parsing expiresIn:', error);
      throw error;
    }

    try {
      // Save the mapping in the store
      await this.store.set(alias, { url: longUrl, expiresAt });
    } catch (error) {
      console.error('Error saving shortened URL:', error);
      throw new Error('Could not save shortened URL.');
    }

    // Return the complete shortened URL
    return `${this.baseDomain}/${alias}`;
  }

  /**
   * Resolves a short alias to its original URL.
   * Returns null if the alias does not exist or has expired.
   */
  async resolve(alias: string): Promise<string | null> {
    let entry;
    try {
      entry = await this.store.get(alias);
    } catch (error) {
      console.error('Error retrieving URL:', error);
      return null;
    }

    if (!entry) {
      return null;
    }

    // If the URL has expired, delete it and return null.
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      try {
        await this.store.delete(alias);
      } catch (error) {
        console.error('Error deleting expired URL:', error);
      }
      return null;
    }

    return entry.url;
  }

  /**
   * Validates a URL string using the URL constructor.
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates a random alphanumeric code of the specified length.
   */
  private generateCode(length: number): string {
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * URLShortener.CHAR_SET.length);
      code += URLShortener.CHAR_SET[randomIndex];
    }
    return code;
  }
}
