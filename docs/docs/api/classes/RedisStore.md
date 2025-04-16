# Class: RedisStore

Defined in:
[stores/redisStore.ts:15](https://github.com/The-Node-Forge/url-shortener/blob/95fffd996cac023e63bec6536e26075a3ee1dcf3/src/stores/redisStore.ts#L15)

RedisStore implements the StoreAdapter interface using Redis for persistence. Each
method includes try/catch blocks to handle possible asynchronous errors.

Note: Ensure that you have installed the optional 'redis' package if you plan to use
this store.

## Implements

- `StoreAdapter`
