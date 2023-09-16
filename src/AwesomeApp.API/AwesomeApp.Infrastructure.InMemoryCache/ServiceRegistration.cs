using AwesomeApp.Domain.Entities;
using AwesomeApp.Domain.Repositories;
using AwesomeApp.Infrastructure.InMemoryCache.Dao;
using AwesomeApp.Infrastructure.InMemoryCache.Repositories;
using Microsoft.Extensions.DependencyInjection;

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
        /// <returns>service collection</returns>
        public static IServiceCollection RegisterApplication(this IServiceCollection services)
        {
            services.AddSingleton<IEntityCache<Account>, EntityCache<Account>>(_ => EntityCache<Account>.CreateEntityCache());

            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}