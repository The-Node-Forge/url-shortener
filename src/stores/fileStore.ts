/* eslint-disable no-magic-numbers */
/* eslint-disable space-before-function-paren */
import fs from 'fs';

import { StoreAdapter, StoreEntry } from '../types/types';
/**
 * FileStore implements the StoreAdapter interface using a JSON file for persistence.
 * Error handling is applied to file read/write operations.
 */
export class FileStore implements StoreAdapter {
  private filepath: string;
  private store: Record<string, StoreEntry>;

  constructor(filepath = './url-store.json') {
    this.filepath = filepath;
    // Load the store from file or initialize an empty store if not found or on error.
    this.store = this.load();
  }

  // Loads store data from the JSON file with error handling.
  private load(): Record<string, StoreEntry> {
    try {
      if (!fs.existsSync(this.filepath)) return {};
      const data = fs.readFileSync(this.filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading store file:', error);
      return {};
    }
  }

  // Saves the current store to the JSON file with error handling.
  private save(): void {
    try {
      fs.writeFileSync(this.filepath, JSON.stringify(this.store, null, 2));
    } catch (error) {
      console.error('Error saving store file:', error);
      // In production, you might choose to propagate the error or handle it differently.
    }
  }

  async get(alias: string): Promise<StoreEntry | null> {
    return this.store[alias] ?? null;
  }

  async set(
    alias: string,
    entry: StoreEntry,
    override: boolean = false,
  ): Promise<void> {
    if ((await this.has(alias)) && !override) {
      throw new Error(
        `Alias "${alias}" already exists. Use override option to replace it.`,
      );
    }
    this.store[alias] = entry;
    this.save();
  }

  async delete(alias: string): Promise<void> {
    delete this.store[alias];
    this.save();
  }

  async has(alias: string): Promise<boolean> {
    return alias in this.store;
  }

  async list(): Promise<Record<string, StoreEntry>> {
    return { ...this.store };
  }

  async clearExpired(): Promise<void> {
    const now = Date.now();
    for (const alias in this.store) {
      if (this.store[alias].expiresAt && now > this.store[alias].expiresAt) {
        delete this.store[alias];
      }
    }
    this.save();
  }
}
