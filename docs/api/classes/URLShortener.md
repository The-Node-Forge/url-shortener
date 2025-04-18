[**@the-node-forge/url-shortener**](../README.md)

***

[@the-node-forge/url-shortener](../globals.md) / URLShortener

# Class: URLShortener

Defined in: [components/URLShortener.ts:10](https://github.com/The-Node-Forge/url-shortener/blob/e4b3a8782385d9a4b67e4a79a60b9de08de21378/src/components/URLShortener.ts#L10)

URLShortener provides methods to shorten URLs and resolve aliases.
All methods are asynchronous and include robust error handling.

## Constructors

### new URLShortener()

> **new URLShortener**(`baseDomain`, `store`): [`URLShortener`](URLShortener.md)

Defined in: [components/URLShortener.ts:23](https://github.com/The-Node-Forge/url-shortener/blob/e4b3a8782385d9a4b67e4a79a60b9de08de21378/src/components/URLShortener.ts#L23)

Create a new URLShortener instance.

#### Parameters

##### baseDomain

`string`

Domain used for returned shortened URLs (e.g., "https://sho.rt")

##### store

`StoreAdapter`

Redis-backed implementation of the StoreAdapter interface

#### Returns

[`URLShortener`](URLShortener.md)

## Methods

### resolve()

> **resolve**(`alias`): `Promise`\<`null` \| `string`\>

Defined in: [components/URLShortener.ts:98](https://github.com/The-Node-Forge/url-shortener/blob/e4b3a8782385d9a4b67e4a79a60b9de08de21378/src/components/URLShortener.ts#L98)

Resolves a short alias back to its original long URL.
- If alias doesn’t exist, returns null
- If alias exists but expired, deletes it and returns null

#### Parameters

##### alias

`string`

The short code to resolve

#### Returns

`Promise`\<`null` \| `string`\>

The original long URL or null if not found/expired

***

### shorten()

> **shorten**(`longUrl`, `options`?): `Promise`\<`string`\>

Defined in: [components/URLShortener.ts:39](https://github.com/The-Node-Forge/url-shortener/blob/e4b3a8782385d9a4b67e4a79a60b9de08de21378/src/components/URLShortener.ts#L39)

Shortens a long URL into a shorter one with an alias.
- Generates alias if not provided
- Validates the URL
- Checks for collisions
- Supports optional expiration time and override flag

#### Parameters

##### longUrl

`string`

The full, original URL to shorten

##### options?

`ShortenOptions`

Optional config (alias, override, expiresIn)

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the full shortened URL string
