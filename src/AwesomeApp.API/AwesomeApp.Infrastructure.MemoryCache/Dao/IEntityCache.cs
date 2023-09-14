using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Infrastructure.MemoryCache.Dao
{
    internal interface IEntityCache<T> where T : AwesomeEntity
    {
        T? GetEntry(uint id);

        IEnumerable<T> GetEntries();

        T SetEntry(T entry);

        void DeleteEntry(uint id);
    }
}
