using AwesomeApp.Application;
using AwesomeApp.Infrastructure.InMemoryCache;

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
        IConfiguration configuration = builder.Configuration;

        services.RegisterApplication();
        services.RegisterInMemoryCache(configuration);

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

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

        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}