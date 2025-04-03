---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Example

```js
const { shortenUrl } = require('@the-node-forge/url-shortener');

(async () => {
  const shortUrl = await shortenUrl('https://example.com/some/long/url');
  console.log(shortUrl); // Output: https://sho.rt/abc123
})();
```

### Configuration

You can pass an optional `options` object to configure aliasing or expiration:

```js
const shortUrl = await shortenUrl('https://example.com', {
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

For API details, see [API_REFERENCE.md](API_REFERENCE.md).
