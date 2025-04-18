<div align="center">

# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)

[![NPM Version](https://img.shields.io/npm/v/@the-node-forge/url-shortener)](https://www.npmjs.com/package/@the-node-forge/url-shortener)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/url-shortener/ci.yaml?branch=main)](https://github.com/The-Node-Forge/url-shortener/actions)
![Platform](https://img.shields.io/badge/platform-node.js-brightgreen)

[Live Documentation](https://the-node-forge.github.io/url-shortener/)

</div>

A **simple, fast, and Redis-backed URL shortener** written in TypeScript. Supports
custom aliases, TTL expiration, and works seamlessly in Node.js environments.

---

## ✨ Features

- ✅ **Custom Aliases** – Define readable slugs like `sho.rt/launch`
- ✅ **Expiration Support** – Auto-expire short links after a set TTL
- ✅ **Redis Store** – High-performance storage backend
- 🔀 **Collision Handling** – Auto-generate or error on alias conflicts
- 📚 **Fully Typed** – TypeScript-first design with clean API docs

---

## 📦 Installation

```bash
npm install @the-node-forge/url-shortener
```

```bash
yarn add @the-node-forge/url-shortener
```

### Redis Required

```bash
npm install redis
```

> Redis is required and should be connected externally via `createClient()`

---

## 🛠️ Basic Usage

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const client = createClient();
await client.connect();

const store = new RedisStore(client);
const shortener = new URLShortener('https://sho.rt', store);

const shortUrl = await shortener.shorten('https://example.com/very/long/url', {
  alias: 'launch',
  expiresIn: '7d',
});

console.log(shortUrl); // https://sho.rt/launch
```

### Resolve a Link

```ts
const result = await shortener.resolve('launch');
console.log(result); // https://example.com/very/long/url
```

---

## 📘 API Reference

### `new URLShortener(baseDomain, store)`

| Parameter    | Type           | Required | Description                     |
| ------------ | -------------- | -------- | ------------------------------- |
| `baseDomain` | `string`       | ❌       | Domain to prefix for short URLs |
| `store`      | `StoreAdapter` | ✅       | Instance of RedisStore          |

### `shorten(longUrl, options?)`

| Option      | Type      | Required | Description                        |
| ----------- | --------- | -------- | ---------------------------------- |
| `longUrl`   | `string`  | ✅       | The URL to shorten                 |
| `alias`     | `string`  | ❌       | Custom code (e.g., "my-link")      |
| `expiresIn` | `string`  | ❌       | TTL like "1h", "30m", "7d"         |
| `override`  | `boolean` | ❌       | Replace alias if it already exists |

### `resolve(alias)`

Returns the original URL string, or `null` if expired or missing.

---

## 🌍 Environment Compatibility

This package works in modern server-side runtimes:

- ✅ Node.js
- ✅ Deno / Bun (with bundler)

| Store      | Runtime      | Notes                              |
| ---------- | ------------ | ---------------------------------- |
| RedisStore | ✅ Node-only | Requires Redis and `redis` package |

> This is a backend utility. Frontend usage is not supported directly — build an API
> endpoint instead.

---

## 💡 Contributing

Contributions welcome! Open an issue or PR if you have improvements, ideas, or bug
fixes.

---

## ⭐ Support

If you like this project, consider leaving a ⭐ on
[GitHub](https://github.com/The-Node-Forge/url-shortener)!

---

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@the-node-forge/url-shortener)
- 🧾 [Live Docs](https://the-node-forge.github.io/url-shortener/)
- 🏗 [The Node Forge](https://github.com/The-Node-Forge)
