/* eslint-disable space-before-function-paren */
import { StoreAdapter, StoreEntry } from '../types/types';
/**
 * InMemoryStore implements the StoreAdapter interface using a JavaScript Map.
 * All operations are wrapped in async functions for API consistency.
 */
export class InMemoryStore implements StoreAdapter {
  private store = new Map<string, StoreEntry>();

  // Retrieve a store entry by alias
  async get(alias: string): Promise<StoreEntry | null> {
    return this.store.get(alias) ?? null;
  }

  // Save a new store entry under the given alias
  async set(alias: string, entry: StoreEntry): Promise<void> {
    this.store.set(alias, entry);
  }

  // Delete a store entry by alias
  async delete(alias: string): Promise<void> {
    this.store.delete(alias);
  }

  // Check if the alias exists in the store
  async has(alias: string): Promise<boolean> {
    return this.store.has(alias);
  }

  // List all store entries as an object
  async list(): Promise<Record<string, StoreEntry>> {
    const result: Record<string, StoreEntry> = {};
    for (const [key, value] of this.store.entries()) {
      result[key] = value;
    }
    return result;
  }

  // Clear all expired store entries based on the current time
  async clearExpired(): Promise<void> {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (value.expiresAt && now > value.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}
