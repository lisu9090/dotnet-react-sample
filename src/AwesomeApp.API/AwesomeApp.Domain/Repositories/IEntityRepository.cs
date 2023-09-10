using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Domain.Repositories
{
    public interface IEntityRepository<T> where T : AwesomeEntity
    {
        Task<T> GetAsync(int id, CancellationToken cancellationToken);

        Task<T> GetAllAsync(CancellationToken cancellationToken);

        Task<T> UpsertAsync(T entity, CancellationToken cancellationToken);

        Task DeleteAsync(int id, CancellationToken cancellationToken);
    }
}
