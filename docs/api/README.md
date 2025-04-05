**@the-node-forge/url-shortener**

---

<div align="center">

# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)

[![NPM Version](https://img.shields.io/npm/v/@the-node-forge/url-shortener)](https://www.npmjs.com/package/@the-node-forge/url-shortener)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/url-shortener/ci.yaml?branch=main)](https://github.com/The-Node-Forge/url-shortener/actions)
![Platform](https://img.shields.io/badge/platform-node.js%20%7C%20browser-brightgreen)

[Live Documentation](https://the-node-forge.github.io/url-shortener/)

</div>

A **simple and flexible URL shortener** package for JavaScript/TypeScript
applications. This package helps developers **create branded or custom short URLs**
for their projects.

## ✨ Features

- ✅ **Custom Aliases** – Shorten with a readable slug.
- ✅ **Expiration Support** – Set TTL for each link.
- ✅ **Self-hostable** – Use with your own Express backend.
- ✅ **Frontend-Friendly** – Call via API from client apps.

---

## 📦 Installation

```sh
npm install @the-node-forge/url-shortener
```

or using Yarn:

```sh
yarn add @the-node-forge/url-shortener
```

---

## 🛠️ Basic Usage

### **1️⃣ 🌐 JavaScript/TypeScript Example**

```javascript
import { shortenUrl } from '@the-node-forge/url-shortener';

(async () => {
  const shortUrl = await shortenUrl('https://example.com/some/long/path', {
    alias: 'launch',
    expiresIn: '7d',
  });
  console.log(shortUrl); // Output: https://sho.rt/launch
})();
```

---

### 2️⃣ 🌐 Express Integration Example

```typescript
import express from 'express';
import { shortenUrl } from '@the-node-forge/url-shortener';

const app = express();
app.use(express.json());

app.post('/shorten', async (req, res) => {
  const { url, options } = req.body;
  try {
    const shortUrl = await shortenUrl(url, options);
    res.json({ shortUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('URL shortener running on port 3000'));
```

---

## ✅ **API Reference**

### **shortenUrl Function**

```typescript
shortenUrl(longUrl: string, options?: {
  alias?: string;
  expiresIn?: string;
}): Promise<string>
```

| Parameter   | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| `longUrl`   | `string` | The original URL to be shortened            |
| `alias`     | `string` | Optional custom slug for the shortened URL  |
| `expiresIn` | `string` | Optional TTL for the short link (e.g. "7d") |

#### **Returns**

- `Promise<string>` – The generated shortened URL.

---

### 💡 **Contributing**

Contributions are welcome! Please submit
[issues](https://github.com/The-Node-Forge/url-shortener/issues) or
[pull requests](https://github.com/The-Node-Forge/url-shortener/pulls).

---

### ⭐ Support

If you find this package useful, please **give it a ⭐ on**
[GitHub](https://github.com/The-Node-Forge/url-shortener)

---

### 🔗 **Links**

- 📦 [NPM Package](https://www.npmjs.com/package/@the-node-forge/url-shortener)
- 🏗 [The-Node-Forge](https://github.com/The-Node-Forge)
