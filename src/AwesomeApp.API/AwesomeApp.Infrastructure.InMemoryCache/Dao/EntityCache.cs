using AwesomeApp.Domain.Entities;
using Microsoft.Extensions.Options;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    internal class EntityCache<T> : IEntityCache<T> where T : AwesomeEntity
    {
        private readonly IMemoryCacheProxy _cache;

        public EntityCache(IMemoryCacheProxy cache)
        {
            _cache = cache;
        }

        public static EntityCache<T> CreateEntityCache(IOptions<List<T>>? dataToSeed = null)
        {
            var cache = new EntityCache<T>(new MemoryCacheProxy(nameof(T)));

            if (dataToSeed != null && dataToSeed.Value.Any())
            {
                foreach(var item in dataToSeed.Value)
                {
                    cache.SetEntity(item);
                }
            }

            return cache;
        }

        public T? GetEntity(uint id)
        {
            return (T)_cache.Get(id.ToString());
        }

        public IEnumerable<T> GetEntities()
        {
            return _cache.GetAll().Select(item => (T)item);
        }

        public T SetEntity(T entry)
        {
            if (entry == null)
            {
                throw new ArgumentNullException(nameof(entry));
            }

            // TODO this logic should be parametrized
            if (entry.Id != default)
            {
                var id = GetNextId();

                entry.Id = id;
                entry.CreatedAt = DateTime.UtcNow;

                _cache.Set(id.ToString(), entry);

                return entry;
            }

            _cache.Set(entry.Id.ToString(), entry);

            return entry;
        }

        public void DeleteEntity(uint id)
        {
            _cache.Remove(id.ToString());
        }

        private uint GetNextId() => 
            Enumerable.DefaultIfEmpty(_cache.GetKeys().Select(uint.Parse)).Max() + 1;
    }
}
