---
title: Installation
description: Installation details.
sidebar_position: 2
---

### Prerequisites

- `Node.js` version **18+**
- `npm` or `yarn` installed globally
- A running Redis server (locally or remote)

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

### Redis Required

Install the official Redis client:

```bash
npm install redis
```

> The `redis` package is required. Make sure your Redis instance is accessible and
> connected before calling any URL shortening methods.

---

### Runtime Compatibility

This package runs in:

- ✅ Node.js (18+)
- ✅ Bun (via bundler)
- ✅ Deno (via bundler)

> This library is designed for backend/server-side usage only.

---

For examples and configuration, see [USAGE.md](./USAGE.md) and
[API_REFERENCE.md](./API_REFERENCE.md).
