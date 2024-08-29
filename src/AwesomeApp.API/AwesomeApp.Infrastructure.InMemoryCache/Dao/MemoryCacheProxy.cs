using System.Runtime.Caching;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    /// <summary>
    /// <see cref="IMemoryCacheProxy"/> implementation
    /// </summary>
    internal class MemoryCacheProxy : IMemoryCacheProxy, IDisposable
    {
        private const int CacheTtlInDays = 100;
        private readonly MemoryCache _cache;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="name">Name of MemoryCache</param>
        public MemoryCacheProxy(string name)
        {
            _cache = new MemoryCache(name);
        }

        public object Get(string key)
        {
            return _cache.Get(key);
        }

        public IEnumerable<object> GetAll()
        {
            return _cache.AsEnumerable().Select(keyValue => keyValue.Value);
        }

        public IEnumerable<string> GetKeys()
        {
            return _cache.AsEnumerable().Select(keyValue => keyValue.Key);
        }

        public void Set(string key, object value)
        {
            _cache.Set(key, value, DateTimeOffset.Now.AddDays(CacheTtlInDays));
        }

        public object Remove(string key)
        {
            return _cache.Remove(key);
        }

        public void Dispose()
        {
            _cache.Dispose();
        }
    }
}
