using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Infrastructure.InMemoryCache
{
    /// <summary>
    /// Type to register data to be seed in cache using Options pattern
    /// </summary>
    internal class AccountDataToSeedOptions : List<Account>
    {
    }
}
