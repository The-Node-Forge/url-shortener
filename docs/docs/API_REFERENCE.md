---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `new URLShortener(baseDomain, store)`

Creates a new instance of the URL shortener.

**Parameters:**

| Parameter    | Type           | Required | Default          | Description                          |
| ------------ | -------------- | -------- | ---------------- | ------------------------------------ |
| `baseDomain` | `string`       | ❌       | "https://sho.rt" | Domain used for generated short URLs |
| `store`      | `StoreAdapter` | ✅       | _none_           | Redis-backed store (via RedisStore)  |

**Returns:**

- A configured instance of `URLShortener`

---

### `shorten(longUrl, options?)`

Generates a shortened version of a long URL.

**Parameters:**

| Parameter   | Type      | Required | Description                                    |
| ----------- | --------- | -------- | ---------------------------------------------- |
| `longUrl`   | `string`  | ✅       | The full URL to shorten                        |
| `options`   | `object`  | ❌       | Optional settings (alias, expiresIn, override) |
| `alias`     | `string`  | ❌       | Optional custom slug (e.g., `launch`)          |
| `expiresIn` | `string`  | ❌       | Expiration duration like `1h`, `30m`, `7d`     |
| `override`  | `boolean` | ❌       | Overwrite an existing alias if one exists      |

**Returns:**

- `Promise<string>` – The shortened URL (e.g., `https://sho.rt/launch`)

---

### `resolve(alias)`

Resolves a short alias back to the original URL.

**Parameters:**

| Parameter | Type     | Required | Description               |
| --------- | -------- | -------- | ------------------------- |
| `alias`   | `string` | ✅       | The short code to resolve |

**Returns:**

- `Promise<string | null>` – Original URL, or `null` if not found or expired

---

### 🧱 StoreAdapter Interface

Any custom store implementation (such as RedisStore) must implement the following
methods:

```ts
interface StoreAdapter {
  get(alias: string): Promise<StoreEntry | null>;
  set(alias: string, entry: StoreEntry, override?: boolean): Promise<void>;
  delete(alias: string): Promise<void>;
  has(alias: string): Promise<boolean>;
  list(): Promise<Record<string, StoreEntry>>;
  clearExpired(): Promise<void>;
}
```

Each `StoreEntry` looks like this:

```ts
interface StoreEntry {
  url: string;
  expiresAt?: number;
}
```

---

### ✅ Runtime Compatibility

| Environment | Status |
| ----------- | ------ |
| Node.js     | ✅ Yes |
| Deno        | ✅ Yes |
| Bun         | ✅ Yes |

> Note: This package is for backend use. You must proxy it through your own API if
> used with a frontend app.

---

### 🗃 Supported Store

| Store      | Runtime      | Notes                              |
| ---------- | ------------ | ---------------------------------- |
| RedisStore | ✅ Node-only | Requires Redis and `redis` package |
