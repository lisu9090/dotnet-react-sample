using AwesomeApp.Application;
using AwesomeApp.Infrastructure.InMemoryCache;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.RegisterApplication();
builder.Services.RegisterInMemoryCache();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
