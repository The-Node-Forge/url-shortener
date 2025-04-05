**@the-node-forge/url-shortener**

***

<div align="center">

# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)

[![NPM Version](https://img.shields.io/npm/v/@the-node-forge/url-shortener)](https://www.npmjs.com/package/@the-node-forge/url-shortener)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/url-shortener/ci.yaml?branch=main)](https://github.com/The-Node-Forge/url-shortener/actions)
![Platform](https://img.shields.io/badge/platform-node.js%20%7C%20browser-brightgreen)

[Live Documentation](https://the-node-forge.github.io/url-shortener/)

</div>

A **modular, flexible, and fully-documented URL shortener** written in TypeScript.
Supports custom aliases, expiration, multiple storage backends, and works across
Node.js, browser, and serverless environments.

---

## ✨ Features

- ✅ **Custom Aliases** – Define readable slugs like `sho.rt/launch`
- ✅ **Expiration Support** – Auto-expire short links after a set TTL
- ✅ **Pluggable Storage** – In-memory, file, or Redis
- ✅ **Works Anywhere** – Node.js, Bun, Deno, browser (via bundling)
- 🔀 **Collision Handling** – Auto-generate or error on alias conflicts
- 📚 **Full Documentation** – Clean, clear Docusaurus docs + typed API

---

## 📦 Installation

```bash
npm install @the-node-forge/url-shortener
```

or

```bash
yarn add @the-node-forge/url-shortener
```

### Redis Support (Optional)

```bash
npm install redis
```

> Redis is only required if using the `RedisStore`. It is listed as an
> `optionalDependency`.

---

## 🛠️ Basic Usage

```ts
import { URLShortener } from '@the-node-forge/url-shortener';

const shortener = new URLShortener();

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

## 🧪 Advanced Setup: Redis Support

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const client = createClient();
await client.connect();

const store = new RedisStore(client);
const shortener = new URLShortener('https://sho.rt', store);
```

---

## 📘 API Reference

### `new URLShortener({ baseDomain?, store? })`

| Parameter    | Type           | Default          | Description                                 |
| ------------ | -------------- | ---------------- | ------------------------------------------- |
| `baseDomain` | `string`       | "https://sho.rt" | Base domain for generated short URLs        |
| `store`      | `StoreAdapter` | `InMemoryStore`  | Storage backend (in-memory, file, or Redis) |

Returns a new instance of the shortener.

### `shorten(longUrl, options?)`

| Parameter   | Type     | Required | Description                   |
| ----------- | -------- | -------- | ----------------------------- |
| `longUrl`   | `string` | ✅       | The URL to shorten            |
| `alias`     | `string` | ❌       | Optional custom short code    |
| `expiresIn` | `string` | ❌       | Time-to-live like "1d", "30m" |

Returns: `Promise<string>`

### `resolve(alias)`

| Parameter | Type     | Required | Description                     |
| --------- | -------- | -------- | ------------------------------- |
| `alias`   | `string` | ✅       | The alias code (e.g., `launch`) |

Returns: `Promise<string | null>` – The original URL or `null` if expired/not found.

---

## 🌍 Environment Compatibility

This package works in all modern JS runtimes:

- ✅ Node.js
- ✅ Deno
- ✅ Bun
- ✅ Browser (via bundler like Vite/Webpack)

| Store         | Environment  | Notes                              |
| ------------- | ------------ | ---------------------------------- |
| InMemoryStore | ✅ Universal | Fully runtime-safe                 |
| FileStore     | ❌ Node-only | Uses `fs` module                   |
| RedisStore    | ❌ Node-only | Requires Redis and `redis` package |

> In browser apps, create an API layer — avoid importing directly on the frontend.

---

## 🧪 Testing / Express API Example

```ts
import express from 'express';
import { URLShortener } from '@the-node-forge/url-shortener';

const app = express();
const shortener = new URLShortener();

app.use(express.json());

app.post('/shorten', async (req, res) => {
  try {
    const shortUrl = await shortener.shorten(req.body.url, req.body.options);
    res.json({ shortUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

---

## 💡 Contributing

We welcome all contributions — big or small! Feel free to open
[issues](https://github.com/The-Node-Forge/url-shortener/issues) or submit
[pull requests](https://github.com/The-Node-Forge/url-shortener/pulls).

---

## ⭐ Support

If you find this useful, consider starring us on
[GitHub](https://github.com/The-Node-Forge/url-shortener) ⭐

---

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@the-node-forge/url-shortener)
- 🧾 [Live Docs](https://the-node-forge.github.io/url-shortener/)
- 🏗 [The Node Forge](https://github.com/The-Node-Forge)
