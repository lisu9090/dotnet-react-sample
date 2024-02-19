namespace AwesomeApp.Domain
{
    public interface IEntityRepository<T> where T : Entity
    {
        Task<T?> GetAsync(uint id, CancellationToken cancellationToken);

        Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken);

        Task<T> UpsertAsync(T entity, CancellationToken cancellationToken);

        Task DeleteAsync(uint id, CancellationToken cancellationToken);
    }
}
