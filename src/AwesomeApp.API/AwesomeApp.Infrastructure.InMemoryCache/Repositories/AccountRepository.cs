using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using AwesomeApp.Infrastructure.InMemoryCache.Dao;

namespace AwesomeApp.Infrastructure.InMemoryCache.Repositories
{
    /// <summary>
    /// <see cref="IAccountRepository"/> implementation
    /// </summary>
    internal class AccountRepository : IAccountRepository
    {
        private readonly IEntityCache<Account> _cache;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="cache">Entity cache instance</param>
        public AccountRepository(IEntityCache<Account> cache)
        {
            _cache = cache;
        }

        public Task<Account?> GetAsync(uint id, CancellationToken _)
        {
            return Task.FromResult(
                _cache.GetEntity(id));
        }

        public Task<IEnumerable<Account>> GetAsync(uint skip, uint take, CancellationToken _)
        {
            return Task.FromResult(
                _cache
                    .GetEntities()
                    .Skip((int)skip)
                    .Take((int)take));
        }

        public Task<Account?> GetByEmailAsync(string email, CancellationToken _)
        {
            return Task.FromResult(
                _cache.GetEntities().FirstOrDefault(e => e.Email == email));
        }

        public Task<uint> GetCountAsync(CancellationToken _)
        {
            return Task.FromResult(
                (uint)_cache.GetEntities().Count());
        }

        public Task<Account> UpsertAsync(Account entity, CancellationToken _)
        {
            return Task.FromResult(
                _cache.SetEntity(entity));
        }

        public Task DeleteAsync(uint id, CancellationToken _)
        {
            _cache.DeleteEntity(id);

            return Task.CompletedTask;
        }
    }
}
