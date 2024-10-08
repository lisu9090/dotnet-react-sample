# Welcome to Awesome Web App

Powered by common web technologies and frameworks project which gives you initial setup and much more...

## Technology stack

- ASP.NET Core Web API
  - .NET 8.0
  - MediatR
  - MSTest
- Next.js
  - React 18
  - TypeScript
  - MUI (Material UI)
  - Tailwind CSS
  - NextAuth.js

## Design concepts

Concept behind the project is to speed up development process by delivering extensible, ready-to-develop web app. The app takes advantage of common technology stack, architecture, best practices and design patterns that are widely used in modern web systems. Moreover it ships with bunch of mechanisms, which usually need to be developed from scratch on project startup. This includes user authentication, role-based authorization, error handling and localization. All of these can be found in Awesome Web App.

### Architecture

System consists of four main components: 
- **RESTful web API** - REST compliant web API, which serves business logic and can be easily consumed by multiple services.
- **App backend** - acts as a proxy to the API, handles user authentication, authorization and HTTP errors. It can be extended to consume multiple web services. 
- **App frontend** - application user interface.
- **Nginx server** - powerful tool which acts as a proxy to the App and provides secured HTTPS connection (in Production environment).

### RESTful web API

Created using ASP.NET Core Web API is a REST compliant web service. It takes advantage of Layered Architecture and implements Command-Query Responsibility Segregation (CQRS) and Repository patterns. Each layer is separated with contracts that hide implementations and enables power of Dependency Injection. Code correctness is ensured by the set of Unit Tests.

### App backend

Next.js projects ship with build-in API. This API acts as application backend which fetches data from other services, handles user authentication, role-based authorization and HTTP Errors.   

### App frontend

App frontend is React application which takes advantage of Next.js framework. It uses Static Site Generation for pages that do not require user context and Server-Side Rendering in order to manage user access.

### Nginx server

This server acts as App entrypoint when code is running in Docker (Production) environment. It provides extra security by enforcing and handling HTTPS connection. It's omitted during code debugging.

## Running

Application has been containerized so you can build it and run using Docker Compose.

### Prerequisites

In order to run app locally, you will need following software to be installed:
- Visual Studio IDE or .NET CLI
- .NET 8.0 or newer
- Node.js v22 or newer

In order to run app in Production environment, you will need:
- Docker Desktop
- .NET CLI (to generate self-signed SSL certificates while running locally)
- OpenSSL 3.3.2 or newer (to generate self-signed SSL certificates while running locally)

### Running in debug mode (Windows)

1. API
    1. Open src\AwesomeApp.API\AwesomeApp.API.sln file with Visual Studio
    2. Populate AllowedApiKeys array in appsettings.json with SHA512 checksums of API keys 
    3. From menu in the top of window select Debug > Start debugging or press F5 button
2. App
    1. Create config file .env.local in src\AwesomeApp.UI folder based on example.env. Provide value for SESSION_PASSWORD variable
    (this needs to be strong password of at least 32 characters; you can generate one [here](https://1password.com/password-generator/))
    Set AWESOME_API_KEY variable with actual API key. Its SHA512 checksum must match any of AllowedApiKeys (API, appsettings.json) item's value
    2. Open src\AwesomeApp.UI folder in terminal and run commands:
    ``` bash
    npm install
    npm run dev
    ```
    3. Open browser and access https://localhost:3000

### Running locally with Docker (Windows)

1. Create config file .env.production in src\AwesomeApp.UI folder based on example.env. Provide value for SESSION_PASSWORD variable
(this needs to be strong password of at least 32 characters; you can generate one [here](https://1password.com/password-generator/))
Set AWESOME_API_KEY variable with actual API key. Its SHA512 checksum must match any of AllowedApiKeys (API, appsettings.json) item's value
2. Populate AllowedApiKeys array in appsettings.json with SHA512 checksums of API keys 
3. Generate self-signed certificate for API by running src\AwesomeApp.API\cert-gen.bat script
4. Generate self-signed certificate for Nginx by running  src\Nginx\cert-gen.bat script
5. Go to src\Docker and run following commands:
``` bash
docker compose build
docker compose up
```
5. Open browser and access https://localhost:443

## Roadmap

- [x] Create API and App projects
- [x] Setup projects structure
- [x] Setup communication between API and App Backend
- [x] Setup communication between App Backend and App frontend
- [x] Setup error handling in API
- [x] Setup error handling mechanism in both App Backend and frontend
- [ ] ~~Setup sample logging mechanism in API and App Backend~~
- [x] Secure communication between API and App Backend with SSL
- [x] Secure communication between App backend and App frontend with SSL
- [x] Secure API with subscription key
- [x] Secure App backend with JWT token
- [x] Secure App backend with CSRF token
- [x] Secure pages with user authentication
- [x] Enable role-based user authorization
- [ ] Enable App localization (string translations)
- [x] Inline code docs
- [x] Feature: Landing, Error and NotFound pages
- [x] Feature: Create user account
- [x] Feature: Authenticate user
- [x] Feature: UserDetails page that allows to view and edit account data (secured)
- [x] Feature: AdminPanel page that allows admins to manage accounts (secured)
- [x] Feature: Server-side pagination
- [ ] Unit tests
- [x] Docker support
