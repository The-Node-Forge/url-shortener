[**@the-node-forge/url-shortener**](../README.md)

***

[@the-node-forge/url-shortener](../globals.md) / RedisStore

# Class: RedisStore

Defined in: [stores/redisStore.ts:15](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L15)

RedisStore implements the StoreAdapter interface using Redis for persistence.
Each method includes try/catch blocks to handle possible asynchronous errors.

Note: Ensure that you have installed the optional 'redis' package if you plan to use this store.

## Implements

- `StoreAdapter`

## Constructors

### new RedisStore()

> **new RedisStore**(`client`): [`RedisStore`](RedisStore.md)

Defined in: [stores/redisStore.ts:16](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L16)

#### Parameters

##### client

`RedisClientType`

#### Returns

[`RedisStore`](RedisStore.md)

## Methods

### clearExpired()

> **clearExpired**(): `Promise`\<`void`\>

Defined in: [stores/redisStore.ts:92](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L92)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`StoreAdapter.clearExpired`

***

### delete()

> **delete**(`alias`): `Promise`\<`void`\>

Defined in: [stores/redisStore.ts:57](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L57)

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`StoreAdapter.delete`

***

### get()

> **get**(`alias`): `Promise`\<`null` \| `StoreEntry`\>

Defined in: [stores/redisStore.ts:18](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L18)

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<`null` \| `StoreEntry`\>

#### Implementation of

`StoreAdapter.get`

***

### has()

> **has**(`alias`): `Promise`\<`boolean`\>

Defined in: [stores/redisStore.ts:65](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L65)

#### Parameters

##### alias

`string`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

`StoreAdapter.has`

***

### list()

> **list**(): `Promise`\<`Record`\<`string`, `StoreEntry`\>\>

Defined in: [stores/redisStore.ts:74](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L74)

#### Returns

`Promise`\<`Record`\<`string`, `StoreEntry`\>\>

#### Implementation of

`StoreAdapter.list`

***

### set()

> **set**(`alias`, `entry`, `override`): `Promise`\<`void`\>

Defined in: [stores/redisStore.ts:28](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L28)

#### Parameters

##### alias

`string`

##### entry

`StoreEntry`

##### override

`boolean` = `false`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`StoreAdapter.set`
