using AwesomeApp.API.Filters;
using Microsoft.OpenApi.Models;

namespace AwesomeApp.API.Swagger
{
    /// <summary>
    /// Swagger registration extensions
    /// </summary>
    internal static class SwaggerRegistration
    {
        private const string ApiKeySecurityId = "ApiKey"; 

        /// <summary>
        /// Adds Swagger to <see cref="IServiceCollection"/>
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddSwagger(this IServiceCollection services) =>
            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc(
                    "v1", 
                    new() 
                    { 
                        Title = "AwesomeApp API", 
                        Version = "v1" 
                    });

                opt.AddSecurityDefinition(
                    ApiKeySecurityId, 
                    new()
                    {
                        Name = ApiKeyAuthorizationFilter.ApiKeyHeader,
                        Type = SecuritySchemeType.ApiKey,
                        In = ParameterLocation.Header,
                        Description = "API Secret"
                    });

                opt.AddSecurityRequirement(new()
                {
                    {
                        new()
                        {
                            Reference = new()
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = ApiKeySecurityId
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
    }
}
