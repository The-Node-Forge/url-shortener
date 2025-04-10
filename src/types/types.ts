/* types.ts */
/**
 * Contains type definitions and the asynchronous store adapter interface.
 */

export type ShortenOptions = {
  alias?: string;
  expiresIn?: string; // e.g. "1d", "2h", "1h30m"
  override?: boolean;
};

export type StoreEntry = {
  url: string;
  expiresAt?: number;
};

/**
 * Asynchronous store adapter interface.
 * All methods return promises to ensure seamless integration
 * with both synchronous and asynchronous data stores.
 */
export interface StoreAdapter {
  get(alias: string): Promise<StoreEntry | null>;
  set(alias: string, entry: StoreEntry, override?: boolean): Promise<void>;
  delete(alias: string): Promise<void>;
  has(alias: string): Promise<boolean>;
  list(): Promise<Record<string, StoreEntry>>;
  clearExpired(): Promise<void>;
}
