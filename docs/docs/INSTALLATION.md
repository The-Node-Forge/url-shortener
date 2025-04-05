---
title: Installation
description: Installation details.
sidebar_position: 2
---

### Prerequisites

- `Node.js` version **18+** (only required if using FileStore or RedisStore)
- `npm` or `yarn` installed globally

---

### Install the Package

```bash
npm install @the-node-forge/url-shortener
```

or

```bash
yarn add @the-node-forge/url-shortener
```

---

### Redis Support (Optional)

To use the `RedisStore`, install the Redis client:

```bash
npm install redis
```

> Redis is not included by default and must be installed manually if needed.

---

### Runtime Compatibility

The core library works in any modern JavaScript environment:

- ✅ Node.js
- ✅ Deno
- ✅ Bun
- ✅ Browsers (if bundled properly)

Default `InMemoryStore` is fully environment-safe.

---

For usage examples, see [USAGE.md](./USAGE.md) or the
[API Reference](./API_REFERENCE.md).
