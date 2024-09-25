# Base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
ARG port_http
ARG port_https
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_HTTP_PORTS=$port_http
ENV ASPNETCORE_HTTPS_PORTS=$port_https
USER app
WORKDIR /app
EXPOSE $port_http
EXPOSE $port_https

# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AwesomeApp.API/AwesomeApp.API.csproj", "AwesomeApp.API/"]
COPY ["AwesomeApp.Application/AwesomeApp.Application.csproj", "AwesomeApp.Application/"]
COPY ["AwesomeApp.Domain/AwesomeApp.Domain.csproj", "AwesomeApp.Domain/"]
COPY ["AwesomeApp.Infrastructure.InMemoryCache/AwesomeApp.Infrastructure.InMemoryCache.csproj", "AwesomeApp.Infrastructure.InMemoryCache/"]
RUN dotnet restore "./AwesomeApp.API/AwesomeApp.API.csproj"
COPY . .
WORKDIR "/src/AwesomeApp.API"
RUN dotnet build "./AwesomeApp.API.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "./AwesomeApp.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Run
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AwesomeApp.API.dll"]