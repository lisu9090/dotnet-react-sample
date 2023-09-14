using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    internal class EntityCache<T> : IEntityCache<T> where T : AwesomeEntity
    {
        private readonly System.Runtime.Caching.MemoryCache _memoryCache;

        public EntityCache(System.Runtime.Caching.MemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public T? GetEntry(uint id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetEntries()
        {
            throw new NotImplementedException();

            //return _memoryCache.Values;
        }

        public T SetEntry(T entry)
        {
            throw new NotImplementedException();

            //if (entry == null)
            //{
            //    throw new ArgumentNullException(nameof(entry));
            //}

            //if (entry.Id != default)
            //{
            //    var id = GetNextId();

            //    entry.Id = id;

            //    _memoryCache.Add(id, entry);

            //    return entry;
            //}

            //_memoryCache[entry.Id] = entry;

            //return entry;
        }

        public void DeleteEntry(uint id)
        {
            throw new NotImplementedException();
         
            //_memoryCache.Remove(id);
        }

        //private uint GetNextId() => _memoryCache.Keys.Max() + 1;
    }
}
