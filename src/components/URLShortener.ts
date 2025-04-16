/* eslint-disable no-magic-numbers */
/* eslint-disable space-before-function-paren */
import { type ShortenOptions, type StoreAdapter } from '../types/types';
import { parseExpiresIn } from '../utils/parseExpiresIn';

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

  /**
   * Create a new URLShortener instance.
   * @param baseDomain - Domain used for returned shortened URLs (e.g., "https://sho.rt")
   * @param store - Redis-backed implementation of the StoreAdapter interface
   */
  constructor(baseDomain: string, store: StoreAdapter) {
    this.baseDomain = baseDomain;
    this.store = store;
  }

  /**
   * Shortens a long URL into a shorter one with an alias.
   * - Generates alias if not provided
   * - Validates the URL
   * - Checks for collisions
   * - Supports optional expiration time and override flag
   *
   * @param longUrl - The full, original URL to shorten
   * @param options - Optional config (alias, override, expiresIn)
   * @returns A Promise that resolves to the full shortened URL string
   */
  async shorten(longUrl: string, options?: ShortenOptions): Promise<string> {
    // Validate input URL
    if (!this.isValidUrl(longUrl)) {
      throw new Error('Invalid URL format.');
    }

    // If no alias provided, generate a random one
    let alias =
      options?.alias ?? this.generateCode(URLShortener.DEFAULT_CODE_LENGTH);

    // Check if alias already exists
    if (await this.store.has(alias)) {
      if (options?.alias && !options?.override) {
        throw new Error('Alias is already in use.');
      }

      // If no alias was specified and there's a collision, generate a new one until unique
      if (!options?.alias) {
        do {
          alias = this.generateCode(URLShortener.DEFAULT_CODE_LENGTH);
        } while (await this.store.has(alias));
      }
    }

    // Optional expiration timestamp
    let expiresAt: number | undefined;
    try {
      expiresAt = options?.expiresIn
        ? Date.now() + parseExpiresIn(options.expiresIn)
        : undefined;
    } catch (error) {
      console.error('Error parsing expiresIn:', error);
      throw error;
    }

    // Store the shortened URL in Redis
    try {
      await this.store.set(
        alias,
        { url: longUrl, expiresAt },
        options?.override ?? false,
      );
    } catch (error) {
      console.error('Error saving shortened URL:', error);
      throw new Error('Could not save shortened URL.');
    }

    // Return full short URL
    return `${this.baseDomain}/${alias}`;
  }

  /**
   * Resolves a short alias back to its original long URL.
   * - If alias doesn’t exist, returns null
   * - If alias exists but expired, deletes it and returns null
   *
   * @param alias - The short code to resolve
   * @returns The original long URL or null if not found/expired
   */
  async resolve(alias: string): Promise<string | null> {
    let entry;
    try {
      entry = await this.store.get(alias);
    } catch (error) {
      console.error('Error retrieving URL:', error);
      return null;
    }

    if (!entry) return null;

    // Handle expiration
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
   * Helper method to validate a URL string using the built-in URL constructor.
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
   * Used for alias generation.
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
