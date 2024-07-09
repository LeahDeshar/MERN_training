# Learning Redis

```
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker ps
docker exec -it 808387528dae bash
redis-cli -h 127.0.0.1 -p 6379
```

set
mset
get
mget
incr
decr

### String operation

### List operation

- lpop
- lpush
- rpop
- rpush
- blpop
- blpush

### Sets operation

Set is an unordered collection of unique strings

-track unique item, represent relation

**Basic Commands**

- sadd
- srem
- sismember
- sinter
