using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Domain.Accounts.Repositories
{
    public interface IAccountRepository : IEntityRepository<Account>
    {
        Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    }
}
