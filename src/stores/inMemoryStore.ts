/* eslint-disable space-before-function-paren */
import { StoreAdapter, StoreEntry } from '../types/types';

/**
 * InMemoryStore implements the StoreAdapter interface using a JavaScript Map.
 * It is intended for scenarios where persistence between process restarts isn't needed.
 *
 * Note: This store is ephemeral. In a production environment, it should be used only for caching
 * or testing purposes. For persistent storage, consider using FileStore or RedisStore.
 */
export class InMemoryStore implements StoreAdapter {
  private store = new Map<string, StoreEntry>();

  /**
   * Retrieves a store entry by alias.
   * @param alias The alias key.
   * @returns The store entry if found, or null.
   */
  async get(alias: string): Promise<StoreEntry | null> {
    return this.store.get(alias) ?? null;
  }

  /**
   * Saves a new store entry for a given alias.
   * If the alias already exists and override is false, an error is thrown.
   *
   * @param alias The alias key.
   * @param entry The store entry to store.
   * @param override When true, replaces any existing alias entry.
   * @throws Error if the alias exists and override is false.
   */
  async set(
    alias: string,
    entry: StoreEntry,
    override: boolean = false,
  ): Promise<void> {
    if (this.store.has(alias) && !override) {
      throw new Error(
        `Alias "${alias}" already exists. Use override option to replace it.`,
      );
    }
    this.store.set(alias, entry);
  }

  /**
   * Deletes a store entry by alias.
   * @param alias The alias key to delete.
   */
  async delete(alias: string): Promise<void> {
    this.store.delete(alias);
  }

  /**
   * Checks if an alias exists in the store.
   * @param alias The alias key to check.
   * @returns True if the alias exists, otherwise false.
   */
  async has(alias: string): Promise<boolean> {
    return this.store.has(alias);
  }

  /**
   * Lists all store entries as an object keyed by alias.
   * @returns An object containing all store entries.
   */
  async list(): Promise<Record<string, StoreEntry>> {
    const result: Record<string, StoreEntry> = {};
    for (const [key, value] of this.store.entries()) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Clears expired store entries based on the 'expiresAt' timestamp.
   * This method can be run periodically (e.g., via setInterval)
   * to ensure stale data is removed.
   */
  async clearExpired(): Promise<void> {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (value.expiresAt && now > value.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}
