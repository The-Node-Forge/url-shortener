[**@the-node-forge/url-shortener**](../README.md)

***

[@the-node-forge/url-shortener](../globals.md) / URLShortener

# Class: URLShortener

Defined in: [components/URLShortener.ts:12](https://github.com/The-Node-Forge/url-shortener/blob/0505465b023da8537f4142a9cb2e5ebfc46c68fd/src/components/URLShortener.ts#L12)

URLShortener provides methods to shorten URLs and resolve aliases.
All methods are asynchronous and include robust error handling.

## Constructors

### new URLShortener()

> **new URLShortener**(`baseDomain`, `store`): [`URLShortener`](URLShortener.md)

Defined in: [components/URLShortener.ts:20](https://github.com/The-Node-Forge/url-shortener/blob/0505465b023da8537f4142a9cb2e5ebfc46c68fd/src/components/URLShortener.ts#L20)

#### Parameters

##### baseDomain

`string` = `'https://sho.rt'`

##### store

`StoreAdapter` = `...`

#### Returns

[`URLShortener`](URLShortener.md)

## Methods

### resolve()

> **resolve**(`alias`): `Promise`\<`null` \| `string`\>

Defined in: [components/URLShortener.ts:81](https://github.com/The-Node-Forge/url-shortener/blob/0505465b023da8537f4142a9cb2e5ebfc46c68fd/src/components/URLShortener.ts#L81)

Resolves a short alias to its original URL.
Returns null if the alias does not exist or has expired.

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<`null` \| `string`\>

***

### shorten()

> **shorten**(`longUrl`, `options`?): `Promise`\<`string`\>

Defined in: [components/URLShortener.ts:33](https://github.com/The-Node-Forge/url-shortener/blob/0505465b023da8537f4142a9cb2e5ebfc46c68fd/src/components/URLShortener.ts#L33)

Shortens a long URL into a short one.
Validates the URL, ensures alias uniqueness, parses TTL, and stores the mapping.

#### Parameters

##### longUrl

`string`

##### options?

`ShortenOptions`

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the shortened URL string.
