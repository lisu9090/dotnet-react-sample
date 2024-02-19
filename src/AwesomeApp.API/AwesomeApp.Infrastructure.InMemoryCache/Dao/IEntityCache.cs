using AwesomeApp.Domain;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    internal interface IEntityCache<T> where T : Entity
    {
        T? GetEntity(uint id);

        IEnumerable<T> GetEntities();

        T SetEntity(T entry);

        void DeleteEntity(uint id);
    }
}
