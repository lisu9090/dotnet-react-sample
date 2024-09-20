using AwesomeApp.Domain;

namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    /// <summary>
    /// <typeparamref name="T"/> Data Access Object, provides basic Entity-oriented functionality to interact with InMemory store
    /// </summary>
    /// <typeparam name="T"><see cref="Entity"/></typeparam>
    internal interface IEntityCache<T> where T : Entity
    {
        /// <summary>
        /// Gets <typeparamref name="T"/> of given ID from store
        /// </summary>
        /// <param name="id">Entity ID</param>
        /// <returns><typeparamref name="T"/> with correspondig ID</returns>
        T? GetEntity(uint id);

        /// <summary>
        /// Gets all <typeparamref name="T"/>s from store
        /// </summary>
        /// <returns>Collection of <typeparamref name="T"/>s</returns>
        IEnumerable<T> GetEntities();

        /// <summary>
        /// Sets <typeparamref name="T"/> in store
        /// </summary>
        /// <param name="entry">Entity to store</param>
        /// <returns>Set <typeparamref name="T"/></returns>
        T SetEntity(T entry);

        /// <summary>
        /// Deletes <typeparamref name="T"/> from store
        /// </summary>
        /// <param name="id">Entity ID</param>
        void DeleteEntity(uint id);
    }
}
