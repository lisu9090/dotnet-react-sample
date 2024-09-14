using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using AwesomeApp.Infrastructure.InMemoryCache.Dao;
using AwesomeApp.Infrastructure.InMemoryCache.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace AwesomeApp.Infrastructure.InMemoryCache
{
    /// <summary>
    /// Infrastructure layer registration - InMemory cache
    /// </summary>
    public static class ServiceRegistration
    {
        /// <summary>
        /// Registers InMemory cache as Entities store
        /// </summary>
        /// <param name="services">Service collection</param>
        /// <param name="config">App configuration</param>
        /// <returns>Service collection</returns>
        public static IServiceCollection RegisterInMemoryCache(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AccountDataToSeedOptions>(config.GetSection("Accounts"));

            services.AddSingleton<IEntityCache<Account>, EntityCache<Account>>(serviceProvider => 
                EntityCache<Account>.CreateEntityCache(serviceProvider.GetService<IOptions<AccountDataToSeedOptions>>()));

            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}