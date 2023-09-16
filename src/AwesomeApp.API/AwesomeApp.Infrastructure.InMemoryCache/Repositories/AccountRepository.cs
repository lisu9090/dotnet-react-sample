using AwesomeApp.Domain.Entities;
using AwesomeApp.Domain.Repositories;
using AwesomeApp.Infrastructure.InMemoryCache.Dao;

namespace AwesomeApp.Infrastructure.InMemoryCache.Repositories
{
    internal class AccountRepository : IAccountRepository
    {
        private readonly IEntityCache<Account> _cache;

        public AccountRepository(IEntityCache<Account> cache)
        {
            _cache = cache;
        }

        public async Task<Account?> GetAsync(uint id, CancellationToken cancellationToken)
        {
            return _cache.GetEntity(id);
        }

        public async Task<IEnumerable<Account>> GetAllAsync(CancellationToken cancellationToken)
        {
            return _cache.GetEntities();
        }

        public async Task<Account> UpsertAsync(Account entity, CancellationToken cancellationToken)
        {
            return _cache.SetEntity(entity);
        }

        public async Task DeleteAsync(uint id, CancellationToken cancellationToken)
        {
            var entity = _cache.GetEntity(id);

            if (entity != null)
            {
                entity.IsDeleted = true;

                _cache.SetEntity(entity);
            }
        }
    }
}
