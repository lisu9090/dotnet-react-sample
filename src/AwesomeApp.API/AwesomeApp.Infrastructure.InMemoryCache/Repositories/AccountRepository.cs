﻿using AwesomeApp.Domain.Entities;
using AwesomeApp.Domain.Repositories;
using AwesomeApp.Infrastructure.InMemoryCache.Dao;

namespace AwesomeApp.Infrastructure.InMemoryCache.Repositories
{
    internal class AccountRepository : IAccountRepository
    {
        private readonly IMemoryCacheProxy<Account> _cache;

        public Task<Account> GetAsync(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Account> GetAllAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Account> UpsertAsync(Account entity, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}