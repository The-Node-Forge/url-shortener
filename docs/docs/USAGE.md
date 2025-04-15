---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Usage (TypeScript / Node.js)

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const client = createClient();
await client.connect();

const store = new RedisStore(client);
const shortener = new URLShortener('https://sho.rt', store);

const shortUrl = await shortener.shorten('https://example.com/some/long/url');
console.log(shortUrl); // Output: https://sho.rt/abc123

const resolved = await shortener.resolve(shortUrl.split('/').pop()!);
console.log(resolved); // Output: https://example.com/some/long/url
```

---

### Configuration Options

You can pass an `options` object to configure aliasing, expiration, and override
behavior:

```ts
const shortUrl = await shortener.shorten('https://example.com', {
  alias: 'custom-alias',
  expiresIn: '7d',
  override: true,
});
```

Example config:

```json
{
  "alias": "custom-alias",
  "expiresIn": "7d",
  "override": true
}
```

---

### Using with Express

```ts
import express from 'express';
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';
import { URLShortener } from '@the-node-forge/url-shortener';

const app = express();
app.use(express.json());

const client = createClient();
await client.connect();

const shortener = new URLShortener('https://sho.rt', new RedisStore(client));

app.post('/shorten', async (req, res) => {
  try {
    const shortUrl = await shortener.shorten(req.body.url, req.body.options);
    res.json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/resolve/:alias', async (req, res) => {
  const resolvedUrl = await shortener.resolve(req.params.alias);
  if (resolvedUrl) {
    res.redirect(resolvedUrl);
  } else {
    res.status(404).send('Not found or expired');
  }
});
```

---

### Redis Setup

This package uses Redis as the required backend store. Make sure Redis is running and
your app is connected.

```ts
import { createClient } from 'redis';
import { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';

const client = createClient();
await client.connect();

const store = new RedisStore(client);
```

> Make sure to run:
>
> ```bash
> npm install redis
> ```

---

For full method descriptions and customization options, see
[API_REFERENCE.md](./API_REFERENCE.md).
