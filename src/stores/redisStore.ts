/* eslint-disable space-before-function-paren */
// stores/redisStore.ts

// Type-only import for type-checking. This won't force a runtime dependency unless RedisStore is actually used.
import type { RedisClientType } from 'redis';

import { StoreAdapter, StoreEntry } from '../types/types';

/**
 * RedisStore implements the StoreAdapter interface using Redis for persistence.
 * Each method includes try/catch blocks to handle possible asynchronous errors.
 *
 * Note: Ensure that you have installed the optional 'redis' package if you plan to use this store.
 */
export class RedisStore implements StoreAdapter {
  constructor(private client: RedisClientType) {}

  async get(alias: string): Promise<StoreEntry | null> {
    try {
      const data = await this.client.get(alias);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting alias ${alias} from Redis:`, error);
      return null;
    }
  }

  async set(
    alias: string,
    entry: StoreEntry,
    override: boolean = false,
  ): Promise<void> {
    try {
      const exists = await this.has(alias);
      if (exists && !override) {
        throw new Error(
          `Alias "${alias}" already exists. Use override option to replace it.`,
        );
      }
      await this.client.set(alias, JSON.stringify(entry));
    } catch (error) {
      console.error(`Error setting alias ${alias} in Redis:`, error);
      throw error; // Propagate error if needed
    }
  }

  async delete(alias: string): Promise<void> {
    try {
      await this.client.del(alias);
    } catch (error) {
      console.error(`Error deleting alias ${alias} from Redis:`, error);
    }
  }

  async has(alias: string): Promise<boolean> {
    try {
      return (await this.client.exists(alias)) === 1;
    } catch (error) {
      console.error(`Error checking alias ${alias} in Redis:`, error);
      return false;
    }
  }

  async list(): Promise<Record<string, StoreEntry>> {
    const entries: Record<string, StoreEntry> = {};
    try {
      const keys = await this.client.keys('*');
      for (const key of keys) {
        try {
          const val = await this.client.get(key);
          if (val) entries[key] = JSON.parse(val);
        } catch (innerError) {
          console.error(`Error parsing key ${key} in Redis:`, innerError);
        }
      }
    } catch (error) {
      console.error('Error listing keys from Redis:', error);
    }
    return entries;
  }

  async clearExpired(): Promise<void> {
    try {
      const keys = await this.client.keys('*');
      const now = Date.now();
      for (const key of keys) {
        try {
          const val = await this.client.get(key);
          if (val) {
            const entry: StoreEntry = JSON.parse(val);
            if (entry.expiresAt && now > entry.expiresAt) {
              await this.client.del(key);
            }
          }
        } catch (innerError) {
          console.error(
            `Error processing key ${key} during clearExpired in Redis:`,
            innerError,
          );
        }
      }
    } catch (error) {
      console.error('Error clearing expired keys in Redis:', error);
    }
  }
}
