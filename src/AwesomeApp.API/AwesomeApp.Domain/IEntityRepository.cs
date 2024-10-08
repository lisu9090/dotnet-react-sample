namespace AwesomeApp.Domain
{
    /// <summary>
    /// <typeparamref name="T"/> repository that allows to interact with its store 
    /// </summary>
    /// <typeparam name="T"><see cref="Entity"/></typeparam>
    public interface IEntityRepository<T> where T : Entity
    {
        /// <summary>
        /// Gets asynchronously <typeparamref name="T"/> of given ID
        /// </summary>
        /// <param name="id">Entity ID</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Corresponding <typeparamref name="T"/></returns>
        Task<T?> GetAsync(uint id, CancellationToken cancellationToken);

        /// <summary>
        /// Gets asynchronously collection of <typeparamref name="T"/>s
        /// </summary>
        /// <param name="skip">Number of elements to skip</param>
        /// <param name="take">Number of elements to take</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Collection of <typeparamref name="T"/>s</returns>
        Task<IEnumerable<T>> GetAsync(uint skip, uint take, CancellationToken cancellationToken);

        /// <summary>
        /// Gets asynchronously total number of <typeparamref name="T"/>
        /// </summary>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Total number of <typeparamref name="T"/> in store</returns>
        Task<uint> GetCountAsync(CancellationToken cancellationToken);

        /// <summary>
        /// Inserts or updates asynchronously <typeparamref name="T"/>
        /// </summary>
        /// <param name="entity">Entity to insert or update</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Created or updated <typeparamref name="T"/></returns>
        Task<T> UpsertAsync(T entity, CancellationToken cancellationToken);

        /// <summary>
        /// Deletes asynchronously <typeparamref name="T"/> of given ID
        /// </summary>
        /// <param name="id">Entity ID</param>
        /// <param name="cancellationToken">Cancellation token</param>
        Task DeleteAsync(uint id, CancellationToken cancellationToken);
    }
}
