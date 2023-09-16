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
            return services;
        }
    }
}
