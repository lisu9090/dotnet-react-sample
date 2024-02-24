using AwesomeApp.API.Filters;
using AwesomeApp.Application;
using AwesomeApp.Infrastructure.InMemoryCache;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

internal static class Program
{
    private static void Main(string[] args)
    {
        WebApplication
            .CreateBuilder(args)
            .RegisterServices()
            .Build()
            .Configure()
            .Run();
    }

    private static WebApplicationBuilder RegisterServices(this WebApplicationBuilder builder)
    {
        IServiceCollection services = builder.Services;
        IConfiguration config = builder.Configuration;

        services.RegisterApplication();
        services.RegisterInMemoryCache(config);

        services.AddSwaggerGen();
        services.AddEndpointsApiExplorer();
        services.AddControllers(opt =>
        {
            opt.Filters.Add<ApiKeyAuthorizationFilter>();
            opt.Filters.Add<ExceptionFilter>();
        });

        services.Configure<ApiKeyAuthorizationFilterOptions>(config.GetSection("AllowedApiKeys"));

        return builder;
    }

    private static WebApplication Configure(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.MapControllers();

        return app;
    }
}