using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Domain.Accounts.Repositories
{
    /// <inheritdoc/>
    public interface IAccountRepository : IEntityRepository<Account>
    {
        /// <summary>
        /// Gets asynchronously <see cref="Account"/> of given email address
        /// </summary>
        /// <param name="email">Account email address</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Account with corresponding email address</returns>
        Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    }
}
