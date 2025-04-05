---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `URLShortener({ baseDomain?, store? })`

Creates a new instance of the URL shortener.

**Parameters:**

| Parameter    | Type           | Default          | Description                                                    |
| ------------ | -------------- | ---------------- | -------------------------------------------------------------- |
| `baseDomain` | `string`       | "https://sho.rt" | The domain used in the returned short URLs.                    |
| `store`      | `StoreAdapter` | `InMemoryStore`  | Optional custom storage backend (e.g., Redis, File, InMemory). |

**Returns:**

An instance of the URLShortener class.

---

### `shorten(longUrl, options?)`

Generates a shortened version of a long URL.

**Parameters:**

| Parameter   | Type     | Required | Description                                |
| ----------- | -------- | -------- | ------------------------------------------ |
| `longUrl`   | `string` | ✅       | The original URL to shorten.               |
| `options`   | `object` | ❌       | Optional configuration object.             |
| `alias`     | `string` | ❌       | Custom slug (e.g., `launch`).              |
| `expiresIn` | `string` | ❌       | Time to live like `"1h"`, `"30m"`, `"7d"`. |

**Returns:**

- `Promise<string>` – A formatted short URL like `https://sho.rt/launch`

---

### `resolve(alias)`

Resolves a short alias to the original long URL.

**Parameters:**

| Parameter | Type     | Required | Description                 |
| --------- | -------- | -------- | --------------------------- |
| `alias`   | `string` | ✅       | The short alias to resolve. |

**Returns:**

- `Promise<string | null>` – The original URL or `null` if expired/not found

---

### 🌍 Environment Support

The `URLShortener` class is designed to run in **any modern JavaScript runtime**,
including:

- ✅ Node.js
- ✅ Deno
- ✅ Bun
- ✅ Browsers (if bundled properly)

**Store Compatibility:**

| Store           | Environment Support | Notes                                     |
| --------------- | ------------------- | ----------------------------------------- |
| `InMemoryStore` | ✅ Universal        | Safe for Node, browser, and edge runtimes |
| `FileStore`     | ❌ Node.js only     | Uses Node’s `fs` module                   |
| `RedisStore`    | ❌ Node.js only     | Requires the `redis` npm package          |

> For frontend/browser use, always wrap the shortener in a backend API route. Avoid
> exposing business logic or secrets client-side.
