from django.core.cache import cache


class RateLimiter:
    def __init__(self, key, limit, period):
        self.key = f"rl:{key}"
        self.limit = limit
        self.period = period

    def hit(self):
        current = cache.get(self.key)

        if current is None:
            cache.set(self.key, 1, timeout=self.period)
            return True

        if current >= self.limit:
            return False

        cache.incr(self.key)
        return True