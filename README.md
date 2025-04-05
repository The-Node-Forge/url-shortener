<div align="center">

# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)

[![NPM Version](https://img.shields.io/npm/v/@the-node-forge/url-shortener)](https://www.npmjs.com/package/@the-node-forge/url-shortener)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/url-shortener/ci.yaml?branch=main)](https://github.com/The-Node-Forge/url-shortener/actions)
![Platform](https://img.shields.io/badge/platform-node.js%20%7C%20browser-brightgreen)

[Live Documentation](https://the-node-forge.github.io/url-shortener/)

</div>

A **lightweight, flexible URL shortener** library written in TypeScript. This
in-memory solution is perfect for testing, local development, and educational
projects. Easily customize aliases, add expirations, and embed into Node.js or
browser environments.

---

## ✨ Features

- ✅ **Custom Aliases** – Define readable slugs like `sho.rt/launch`
- ✅ **Expiration Support** – Auto-expire short links after a set TTL
- ✅ **Simple In-Memory Store** – No database required
- ✅ **Embeddable Anywhere** – Use in server or browser context
- 🧩 **Swappable Storage Adapter** – Use memory, file, or Redis with the same
  interface
- 🔀 **Collision Handling Options** – Avoid alias errors or auto-generate

---

## 📆 Installation

```bash
npm install @the-node-forge/url-shortener
```

or

```bash
yarn add @the-node-forge/url-shortener
```

### Redis Support (Optional)

If you plan to use Redis for persistence:

```bash
npm install redis
```

Redis is listed as an `optionalDependency` so it's not required unless you use
`RedisStore`.

---

## 🛠️ Usage

### 🌟 Instantiate & Shorten URLs

```ts
import { URLShortener } from '@the-node-forge/url-shortener';

const shortener = new URLShortener(); // defaults to base domain "https://sho.rt"

const shortUrl = await shortener.shorten('https://example.com/some/long/path', {
  alias: 'launch',
  expiresIn: '7d',
});

console.log(shortUrl); // Output: https://sho.rt/launch
```

---

### 🔀 Resolve Short URLs

```ts
const originalUrl = await shortener.resolve('launch');

if (originalUrl) {
  console.log('Original URL:', originalUrl);
} else {
  console.log('Link expired or not found.');
}
```

---

## 🧪 Advanced: Custom Store (e.g. Redis)

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const client = createClient();
await client.connect();

const redisStore = new RedisStore(client);
const shortener = new URLShortener('https://sho.rt', redisStore);

const shortUrl = await shortener.shorten('https://nodeforge.dev', {
  expiresIn: '2h',
});
console.log(shortUrl);
```

---

## 🔮 API

### `new URLShortener(baseDomain?: string, store?: StoreAdapter)`

Creates a new instance of the shortener. Optional `baseDomain` sets the prefix used
in returned short URLs. You can also pass a custom store (in-memory, file, or Redis).

---

### `shorten(longUrl: string, options?: { alias?: string, expiresIn?: string }): Promise<string>`

| Option      | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `longUrl`   | `string` | The original URL to shorten     |
| `alias`     | `string` | Optional custom code/slug       |
| `expiresIn` | `string` | Optional TTL (e.g., "1d", "2h") |

Returns a **Promise<string>** (e.g. `https://sho.rt/launch`).

---

### `resolve(alias: string): Promise<string | null>`

Resolves a short alias back to the original URL, or returns `null` if expired or not
found.

---

## ❌ Limitations

- URLs are stored in-memory by default — restarting the server resets all data.  
  👉 **Fix**: Use a `FileStore` or `RedisStore` for persistence.

- Redis support is **optional** — you must install it manually with
  `npm install redis`.

- Alias collisions will throw unless you auto-generate.  
  👉 **Fix**: Omit the alias to have one generated automatically.

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

- 📆 [NPM Package](https://www.npmjs.com/package/@the-node-forge/url-shortener)
- 🏗 [The Node Forge](https://github.com/The-Node-Forge)
