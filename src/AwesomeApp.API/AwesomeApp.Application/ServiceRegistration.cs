using AwesomeApp.Application.Behaviors.RequestValidations;
using AwesomeApp.Application.Security;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeApp.Application
{
    /// <summary>
    /// Application Layer Registration
    /// </summary>
    public static class ServiceRegistration
    {
        /// <summary>
        /// Registers services
        /// </summary>
        /// <param name="services">Service collection</param>
        /// <returns>Service collection</returns>
        public static IServiceCollection RegisterApplication(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(ServiceRegistration).Assembly);

                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            });

            services.AddAutoMapper(typeof(ServiceRegistration).Assembly);

            services.AddSingleton<IHashService, Sha512HashService>();

            return services;
        }
    }
}
