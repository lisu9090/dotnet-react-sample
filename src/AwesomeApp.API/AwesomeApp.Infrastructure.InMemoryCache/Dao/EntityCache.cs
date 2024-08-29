using AwesomeApp.Domain;
using Microsoft.Extensions.Options;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    /// <summary>
    /// <see cref="IEntityCache{T}"/> implementation
    /// </summary>
    /// <typeparam name="T"><see cref="Entity"/></typeparam>
    internal class EntityCache<T> : IEntityCache<T> where T : Entity
    {
        private readonly IMemoryCacheProxy _cache;

        private EntityCache(IMemoryCacheProxy cache)
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
            return _cache
                .GetAll()
                .Cast<T>()
                .Where(item => !item.IsDeleted)
                .FirstOrDefault(item => item.Id == id);
        }

        public IEnumerable<T> GetEntities()
        {
            return _cache
                .GetAll()
                .Cast<T>()
                .Where(item => !item.IsDeleted);
        }

        public T SetEntity(T entry)
        {
            if (entry == null)
            {
                throw new ArgumentNullException(nameof(entry));
            }

            if (entry.Id == default)
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
            T? entity = GetEntity(id);

            if (entity == null) 
            {
                return;
            }

            entity.IsDeleted = true;

            SetEntity(entity);
        }

        private uint GetNextId() => 
            Enumerable.DefaultIfEmpty(_cache.GetKeys().Select(uint.Parse)).Max() + 1;
    }
}
