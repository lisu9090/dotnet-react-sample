﻿using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Domain.Repositories
{
    public interface IAccountRepository : IEntityRepository<Account>
    {
        Task<Account?> GetByEmailAsync(string email);
    }
}
