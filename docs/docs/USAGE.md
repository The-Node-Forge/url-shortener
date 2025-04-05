---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Usage (TypeScript / Node.js)

```ts
import { URLShortener } from '@the-node-forge/url-shortener';

(async () => {
  const shortener = new URLShortener();

  const shortUrl = await shortener.shorten('https://example.com/some/long/url');
  console.log(shortUrl); // Output: https://sho.rt/abc123

  const resolved = await shortener.resolve(shortUrl.split('/').pop()!);
  console.log(resolved); // Output: https://example.com/some/long/url
})();
```

---

### Optional Configuration

You can pass an `options` object to configure aliasing or expiration:

```ts
const shortUrl = await shortener.shorten('https://example.com', {
  alias: 'custom-alias',
  expiresIn: '7d',
});
```

Example config:

```json
{
  "alias": "custom-alias",
  "expiresIn": "7d"
}
```

---

### Using with Express

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

### Optional: Using Redis

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const client = createClient();
await client.connect();

const shortener = new URLShortener('https://sho.rt', new RedisStore(client));
```

> Be sure to run `npm install redis` if using the RedisStore.

---

For API details, see [API_REFERENCE.md](./API_REFERENCE.md).
