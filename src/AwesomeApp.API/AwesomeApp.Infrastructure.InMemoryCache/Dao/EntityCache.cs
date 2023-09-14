using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    internal class EntityCache<T> : IEntityCache<T> where T : AwesomeEntity
    {
        private readonly IMemoryCacheProxy _cache;

        public EntityCache(IMemoryCacheProxy cache)
        {
            _cache = cache;
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

            if (entry.Id != default)
            {
                var id = GetNextId();

                entry.Id = id;

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

        private uint GetNextId() => _cache.GetKeys().Select(uint.Parse).Max() + 1;
    }
}
