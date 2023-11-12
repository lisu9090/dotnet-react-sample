using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Domain.Repositories
{
    public interface IEntityRepository<T> where T : AwesomeEntity
    {
        Task<T?> GetAsync(uint id, CancellationToken cancellationToken);

        Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken);

        Task<T> UpsertAsync(T entity, CancellationToken cancellationToken);

        Task DeleteAsync(uint id, CancellationToken cancellationToken);
    }
}
