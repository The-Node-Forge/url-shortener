---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

## 9. url-shortener (Self-Hosted or API-based)

**Description:** A TypeScript/JavaScript-based npm package that provides core
utilities to shorten URLs. It can be used in Node.js backend environments or
full-stack apps via custom APIs.

**Why It's Useful:** Simplifies link sharing, improves readability, and offers full
control over branded short URLs and link analytics.

**Features:**

- Generate short links
- Support for custom aliases
- Analytics-ready structure
- Frontend compatibility via backend API

**Complexity:** Moderate

**Technologies:** JavaScript/TypeScript, Express.js

**Code Example (JavaScript - backend integration)**

```js
const { shortenUrl } = require('url-shortener');

(async () => {
  const result = await shortenUrl('https://example.com/very/long/url', {
    alias: 'launch',
  });
  console.log(result); // Output: https://sho.rt/launch
})();
```

---

### `shortenUrl(longUrl, options?)`

Generates a shortened version of a given long URL.

**Parameters:**

- `longUrl` - `string` - The full URL to be shortened.
- `options` - `object` _(optional)_ - Optional settings:
  - `alias` - `string` - Custom short code (e.g., `my-link`).
  - `expiresIn` - `string` - Time-to-live (e.g., `"1d"`, `"7d"`).

**Returns:**

- `Promise<string>` - The generated shortened URL.

**Usage in Express.js or Backend App:**

```js
const express = require('express');
const { shortenUrl } = require('url-shortener');

const app = express();
app.use(express.json());

app.post('/shorten', async (req, res) => {
  try {
    const result = await shortenUrl(req.body.url, req.body.options);
    res.json({ shortUrl: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Optional Frontend Usage via API:**

```js
async function getShortUrl(url) {
  const res = await fetch('/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  const { shortUrl } = await res.json();
  return shortUrl;
}
```

---

> **Note:** This package is designed for backend use. For frontend use, make API
> calls to your backend rather than importing the package directly to protect logic
> and secrets.
