/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */

export interface StoreEntry {
  url: string;
  expiresAt?: number; // Add this property to support TTL functionality.
}

export interface StoreAdapter {
  set(key: string, value: StoreEntry, ttl?: number): Promise<void>;
  get(key: string): Promise<StoreEntry | null>;
  delete(key: string): Promise<void>;
  flushAll(): Promise<void>;
  disconnect(): void;
  has(key: string): Promise<boolean>;
  list(): Promise<Record<string, StoreEntry>>;
  clearExpired(): Promise<void>;
}
export class MockRedisStore {
  // Internal store: map from key to an object containing a StoreEntry and an optional timeout.
  private store = new Map<
    string,
    { entry: StoreEntry; timeout?: ReturnType<typeof setTimeout> }
  >();

  /**
   * Saves a key/value pair with an optional TTL (in milliseconds).
   * @param key
   * @param value A StoreEntry object.
   * @param ttl TTL in milliseconds.
   */
  async set(key: string, value: StoreEntry, override?: boolean): Promise<void> {
    const exists = await this.has(key);
    if (exists && !override) {
      throw new Error('Alias is already in use.');
    }

    this.store.set(key, { entry: value });
  }

  async get(key: string): Promise<StoreEntry | null> {
    const record = this.store.get(key);
    if (!record) return null;
    // Check if the entry has expired
    if (record.entry.expiresAt && Date.now() > record.entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return record.entry;
  }

  /**
   * Deletes a key.
   * @param key
   */
  async delete(key: string): Promise<void> {
    const record = this.store.get(key);
    if (record?.timeout) {
      clearTimeout(record.timeout);
    }
    this.store.delete(key);
  }

  /**
   * Clears all entries.
   */
  async flushAll(): Promise<void> {
    for (const record of this.store.values()) {
      if (record.timeout) {
        clearTimeout(record.timeout);
      }
    }
    this.store.clear();
  }

  /**
   * Disconnect is a no-op in the mock.
   */
  disconnect(): void {
    // Nothing to do.
  }

  // --- Additional methods required by StoreAdapter ---

  /**
   * Checks whether a key exists.
   */
  async has(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  /**
   * Returns a list of all keys in the store.
   */
  async list(): Promise<Record<string, StoreEntry>> {
    const entries: Record<string, StoreEntry> = {};
    for (const [key, { entry }] of this.store.entries()) {
      entries[key] = entry;
    }
    return entries;
  }

  /**
   * Clears expired keys.
   *
   * In this mock, keys expire automatically via timeouts.
   */
  async clearExpired(): Promise<void> {
    // No manual clearing is necessary.
    return;
  }
}
