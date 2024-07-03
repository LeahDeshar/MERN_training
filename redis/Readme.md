docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker ps
docker exec -it 808387528dae bash
redis-cli -h 127.0.0.1 -p 6379

set
mset
get
mget
incr
decr
