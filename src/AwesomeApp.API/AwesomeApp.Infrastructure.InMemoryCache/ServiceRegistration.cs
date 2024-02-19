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
    /// Application Layer Registration
    /// </summary>
    public static class ServiceRegistration
    {
        /// <summary>
        /// Registers service
        /// </summary>
        /// <param name="services">service collection</param>
        /// <param name="config">app configuration</param>
        /// <returns>service collection</returns>
        public static IServiceCollection RegisterInMemoryCache(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<List<Account>>(config.GetSection("Accounts"));

            services.AddSingleton<IEntityCache<Account>, EntityCache<Account>>(serviceProvider => 
                EntityCache<Account>.CreateEntityCache(serviceProvider.GetService<IOptions<List<Account>>>()));

            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}