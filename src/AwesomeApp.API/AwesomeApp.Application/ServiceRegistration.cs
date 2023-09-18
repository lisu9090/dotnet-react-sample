using AwesomeApp.Application.Security;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeApp.Application
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
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ServiceRegistration).Assembly));

            services.AddAutoMapper(typeof(ServiceRegistration).Assembly);

            services.AddTransient<IHashService, Sha512HashService>();

            return services;
        }
    }
}
