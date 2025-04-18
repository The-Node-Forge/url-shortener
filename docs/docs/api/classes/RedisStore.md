# Class: RedisStore

Defined in: [stores/redisStore.ts:15](https://github.com/The-Node-Forge/url-shortener/blob/e4b3a8782385d9a4b67e4a79a60b9de08de21378/src/stores/redisStore.ts#L15)

RedisStore implements the StoreAdapter interface using Redis for persistence.
Each method includes try/catch blocks to handle possible asynchronous errors.

Note: Ensure that you have installed the optional 'redis' package if you plan to use this store.

## Implements

- `StoreAdapter`
