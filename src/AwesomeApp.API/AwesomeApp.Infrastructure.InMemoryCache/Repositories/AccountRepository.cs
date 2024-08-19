using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
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

        public async Task<Account?> GetAsync(uint id, CancellationToken _)
        {
            return _cache.GetEntity(id);
        }

        public async Task<Account?> GetByEmailAsync(string email, CancellationToken _)
        {
            return _cache.GetEntities().FirstOrDefault(e => e.Email == email);
        }

        public async Task<IEnumerable<Account>> GetAsync(uint skip, uint take, CancellationToken _)
        {
            return _cache
                .GetEntities()
                .Skip((int)skip)
                .Take((int)take);
        }

        public async Task<uint> GetCountAsync(CancellationToken _)
        {
            return (uint)_cache.GetEntities().Count();
        }

        public async Task<Account> UpsertAsync(Account entity, CancellationToken _)
        {
            return _cache.SetEntity(entity);
        }

        public async Task DeleteAsync(uint id, CancellationToken _)
        {
            _cache.DeleteEntity(id);
        }
    }
}
